import './polyfills.js'
import { HardcodedOfferingRepository } from './offerings.js'

import { Rfq, Order } from '@tbdex/http-server'
import { Quote, OrderStatus, Close } from '@tbdex/http-server'

import log from './logger.js'
import { config } from './config.js'
import { BearerDid } from '@web5/dids'

import { HttpServerShutdownHandler } from './http-shutdown-handler.js'
import { TbdexHttpServer } from '@tbdex/http-server'
import { requestCredential } from './credential-issuer.js'
import { NextFunction } from 'express-serve-static-core'
import { InMemoryExchangesApi } from './exchanges.js'

console.log('PFI DID1: ', config.pfiDid[0].uri)
console.log('PFI DID2: ', config.pfiDid[1].uri)
console.log('PFI DID3: ', config.pfiDid[2].uri)
console.log('PFI DID4: ', config.pfiDid[3].uri)
console.log('PFI DID5: ', config.pfiDid[4].uri)


process.on('unhandledRejection', (reason: any, promise) => {
  log.error(
    `Unhandled promise rejection. Reason: ${reason}. Promise: ${JSON.stringify(promise)}. Stack: ${reason.stack}`,
  )
})

process.on('uncaughtException', (err) => {
  log.error('Uncaught exception:', err.stack || err)
})

// triggered by ctrl+c with no traps in between
process.on('SIGINT', async () => {
  log.info('exit signal received [SIGINT]. starting graceful shutdown')

  gracefulShutdown()
})

// triggered by docker, tiny etc.
process.on('SIGTERM', async () => {
  log.info('exit signal received [SIGTERM]. starting graceful shutdown')

  gracefulShutdown()
})

interface PFIServerConfig {
  bearerDid: BearerDid,
  port: string
}

function snooper() {
  return function(req: Request, res: Response, next: NextFunction) {
    console.log('snooper' + req.url)
    return next()
  }
}

// TODO: Remove this when spec clarified if should post to /exchanges... or exchanges.../rfq
function redirectPostToRfq() {
  return function(req, res, next) {
    // Check if the request is a POST to /exchanges/:exchangeId
    if (req.method === 'POST' && req.url.match(/^\/exchanges\/\w+$/)) {
      // Modify the request URL to redirect to /exchanges/:exchangeId/rfq
      req.url = req.url + '/rfq'
      console.log('Redirected: ' + req.url)
    }
    // Proceed to the next middleware
    return next()
  }
}

function createPFIServer(pfiConfig: PFIServerConfig) {
  const ExchangeRepository = new InMemoryExchangesApi()
  const activePFI = pfiConfig.bearerDid

  const OfferingRepository = new HardcodedOfferingRepository(activePFI)

  const httpApi = new TbdexHttpServer({
    exchangesApi: ExchangeRepository,
    offeringsApi: OfferingRepository,
    pfiDid: activePFI.uri,
  })

  httpApi.api.use(snooper())
  httpApi.api.use(redirectPostToRfq())

  // provide the quote
  httpApi.onCreateExchange(async (ctx, rfq: Rfq) => {

    console.log('RFQ', JSON.stringify(rfq, null, 2))
    await ExchangeRepository.addMessage(rfq)
    const offering = await OfferingRepository.getOffering({
      id: rfq.data.offeringId,
    })

    // rfq.payinSubunits is USD - but as a string, convert this to a decimal and multiple but our terrible exchange rate
    // convert to a string, with 2 decimal places
    const terribleExchangeRate = 1.1
    const payout = (
      parseFloat(rfq.data.payin.amount) * terribleExchangeRate
    ).toFixed(2)

    if (
      rfq.data.payin.kind == 'CREDIT_CARD' &&
    offering.data.payin.currencyCode == 'USD' &&
    offering.data.payout.currencyCode == 'AUD'
    ) {
      const quote = Quote.create({
        metadata: {
          from: activePFI.uri,
          to: rfq.from,
          exchangeId: rfq.exchangeId,
          protocol: '1.0'
        },
        data: {
          expiresAt: new Date(2028, 4, 1).toISOString(),
          payin: {
            currencyCode: 'USD',
            amount: rfq.data.payin.amount,
          },
          payout: {
            currencyCode: 'AUD',
            amount: payout,
          },
        },
      })
      await quote.sign(activePFI)
      await ExchangeRepository.addMessage(quote)
    }
  })

  // When the customer accepts the order
  httpApi.onSubmitOrder(async (ctx, order: Order) => {
    console.log('order requested')
    await ExchangeRepository.addMessage(order)

    // first we will charge the card
    // then we will send the money to the bank account

    const quote = await ExchangeRepository.getQuote({
      exchangeId: order.exchangeId,
    })
    const rfq = await ExchangeRepository.getRfq({
      exchangeId: order.exchangeId,
    })

    const payinAmount =
    '' + Math.round(parseFloat(quote.data.payin.amount) * 100)

    let response = await fetch('https://test-api.pinpayments.com/1/charges', {
      method: 'POST',
      headers: {
        Authorization:
        'Basic ' + Buffer.from(config.pinPaymentsKey + ':').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        amount: payinAmount,
        currency: 'USD',
        description: 'For remittances',
        ip_address: '203.192.1.172',
        email: 'test@testing.com',
        'card[number]': rfq.privateData.payin.paymentDetails['cc_number'],
        'card[expiry_month]': rfq.privateData.payin.paymentDetails['expiry_month'],
        'card[expiry_year]': rfq.privateData.payin.paymentDetails['expiry_year'],
        'card[cvc]': rfq.privateData.payin.paymentDetails['cvc'],
        'card[name]': rfq.privateData.payin.paymentDetails['name'],
        'card[address_line1]': 'Nunya',
        'card[address_city]': 'Bidnis',
        'card[address_country]': 'USA',
        'metadata[OrderNumber]': '123456',
        'metadata[CustomerName]': 'Roland Robot',
      }),
    })

    let data = await response.json()
    await updateOrderStatus(rfq, 'IN_PROGRESS', activePFI, ExchangeRepository)

    if (response.ok) {
      console.log('Charge created successfully. Token:', data.response.token)
    } else {
      console.error('Failed to create charge. Error:', data)
      await close(rfq, 'Failed to create charge.', activePFI, ExchangeRepository)
      return
    }

    // now transfer the the money to the bank account as AUD
    // first create a reipient and get the recipient token
    response = await fetch('https://test-api.pinpayments.com/1/recipients', {
      method: 'POST',
      headers: {
        Authorization:
        'Basic ' + Buffer.from(config.pinPaymentsKey + ':').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: 'roland@pinpayments.com',
        name: 'Mr Roland Robot',
        'bank_account[name]': rfq.privateData.payout.paymentDetails['accountName'],
        'bank_account[bsb]': rfq.privateData.payout.paymentDetails['bsbNumber'],
        'bank_account[number]':
      rfq.privateData.payout.paymentDetails['accountNumber'],
      }),
    })

    data = await response.json()

    if (data.response && data.response.token) {
      console.log('Recipient created successfully. Token:', data.response.token)
    } else {
      console.log('Unable to create recipient')
      console.log(data)
      await close(rfq, 'Failed to create recipient.', activePFI, ExchangeRepository)
      return
    }

    const recipientToken = data.response.token
    console.log('recipient token:', recipientToken)

    await updateOrderStatus(rfq, 'TRANSFERING_FUNDS', activePFI, ExchangeRepository)

    // multiply payout by 100 for API and make it an integer
    // payout is in AUD cents
    //
    // convert quote.data.payout.amount to a decimal
    const payoutAmount =
    '' + Math.round(parseFloat(quote.data.payout.amount) * 100)

    response = await fetch('https://test-api.pinpayments.com/1/transfers', {
      method: 'POST',
      headers: {
        Authorization:
        'Basic ' + Buffer.from(config.pinPaymentsKey + ':').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        amount: payoutAmount,
        currency: quote.data.payout.currencyCode,
        description: 'For remittances',
        recipient: recipientToken,
      }),
    })

    data = await response.json()

    if (data.response && data.response.status == 'succeeded') {
      console.log('------>Transfer succeeded!!')
      await updateOrderStatus(rfq, 'SUCCESS', activePFI, ExchangeRepository)
      await close(rfq, 'SUCCESS', activePFI, ExchangeRepository)
    } else {
      await updateOrderStatus(rfq, 'FAILED', activePFI, ExchangeRepository)
      await close(rfq, 'Failed to create transfer.', activePFI, ExchangeRepository)
    }

    console.log('all DONE')
  })

  httpApi.onSubmitClose(async (ctx, close) => {
    await ExchangeRepository.addMessage(close)
  })

  const server = httpApi.listen(pfiConfig.port, () => {
    log.info(`Mock PFI listening on port ${pfiConfig.port}`)
  })

  httpApi.api.get('/', (req, res) => {
    res.send(
      'Please use the tbdex protocol to communicate with this server or a suitable library: https://github.com/TBD54566975/tbdex-protocol',
    )
  })

  // This is just for example convenience. In the real world this would be discovered by other means.
  httpApi.api.get('/did', (req, res) => {
    res.send(activePFI.uri)
  })

  // A very low fi implementation of a credential issuer - will just check they are not sanctioned.
  // In the real world this would be done via OIDC4VC or similar.
  // In this case a check could be done on each transaction so a VC could be optional, but it makes the example richer to have it stored in the client (html) and sent with the RFQ.
  httpApi.api.get('/vc', async (req, res) => {
    const credentials = await requestCredential(
    req.query.name as string,
    req.query.country as string,
    req.query.did as string,
    )
    res.send(credentials)
  })

  return { httpApi, server }
}


async function updateOrderStatus(rfq: Rfq, status: string, pfi: BearerDid, ExchangeRepository: InMemoryExchangesApi) {
  console.log(
    '----------->>>>>>>>>                         -------->Updating status',
    status,
  )
  const orderStatus = OrderStatus.create({
    metadata: {
      from: pfi.uri,
      to: rfq.from,
      exchangeId: rfq.exchangeId,
    },
    data: {
      orderStatus: status,
    },
  })
  await orderStatus.sign(pfi)
  await ExchangeRepository.addMessage(orderStatus)
}

async function close(rfq: Rfq, reason: string,  pfi: BearerDid, ExchangeRepository: InMemoryExchangesApi) {
  console.log('closing exchange ', reason)

  const close = Close.create({
    metadata: {
      from: pfi.uri,
      to: rfq.from,
      exchangeId: rfq.exchangeId,
    },
    data: {
      reason: reason,
    },
  })
  await close.sign(pfi)
  await ExchangeRepository.addMessage(close)
}

const myPFIServer1 = createPFIServer({bearerDid: config.pfiDid[0], port: config.port[0]})
const myPFIServer2 = createPFIServer({bearerDid: config.pfiDid[1], port: config.port[1]})
const myPFIServer3 = createPFIServer({bearerDid: config.pfiDid[2], port: config.port[2]})
const myPFIServer4 = createPFIServer({bearerDid: config.pfiDid[3], port: config.port[3]})
const myPFIServer5 = createPFIServer({bearerDid: config.pfiDid[4], port: config.port[4]})



// PFIs shutdown services.
const httpServerShutdownHandler1 = new HttpServerShutdownHandler(myPFIServer1.server)
const httpServerShutdownHandler2 = new HttpServerShutdownHandler(myPFIServer2.server)
const httpServerShutdownHandler3 = new HttpServerShutdownHandler(myPFIServer3.server)
const httpServerShutdownHandler4 = new HttpServerShutdownHandler(myPFIServer4.server)
const httpServerShutdownHandler5 = new HttpServerShutdownHandler(myPFIServer5.server)


function stopServer(handler): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    handler.stop((error) => {
      if (error) {
        log.error('Failed to stop server:', error)
        reject(error)
      } else {
        log.info('Server stopped successfully.')
        resolve()
      }
    })
  })
}

async function gracefulShutdown() {
  try {
    await Promise.all([
      stopServer(httpServerShutdownHandler1),
      stopServer(httpServerShutdownHandler2),
      stopServer(httpServerShutdownHandler3),
      stopServer(httpServerShutdownHandler4),
      stopServer(httpServerShutdownHandler5)
    ])
    log.info('All servers stopped, exiting now.')
    process.exit(0)
  } catch (error) {
    log.error('An error occurred during shutdown:', error)
    process.exit(1)
  }
}