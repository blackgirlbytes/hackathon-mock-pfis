import { OfferingsApi, Offering } from '@tbdex/http-server'
import { config } from './config.js'
// import fs from 'fs/promises'
import { PresentationExchange } from '@web5/credentials'
import { issuerDid } from './credential-issuer.js'
import { BearerDid } from '@web5/dids'

// load issuer's did from a file called issuer-did.txt
const issuer = issuerDid
const fakeExchangeRates: number[] = [0.95, 0.93, 0.94, 0.92, 0.91]

// Function to create a randomized offering
async function createRandomOffering(index: number): Promise<Offering> {
  const selectedExchangeRate = fakeExchangeRates[Math.floor(Math.random() * fakeExchangeRates.length)].toString()

  const offering = Offering.create({
    metadata: {
      from: config.pfiDid[index % 5].uri,  // Alternates between two URIs
      protocol: '1.0'
    },
    data: {
      description: `Exchange TBD for Socks node ${index + 1}`,
      payoutUnitsPerPayinUnit: selectedExchangeRate,
      payout: {
        currencyCode: 'SOC',
        methods: [
          {
            kind: 'DELIVERY_ADDRESS',
            estimatedSettlementTime: 86400, // 24 hours in seconds
            requiredPaymentDetails: {
              '$schema': 'http://json-schema.org/draft-07/schema#',
              'title': 'Socks Required Payment Details',
              'type': 'object',
              'required': [
                'address',
              ],
              'additionalProperties': false,
              'properties': {
                'address': {
                  'title': 'Delivery Address',
                  'description': 'Address to deliver the socks to',
                  'type': 'string'
                },
              }
            }
          },
        ],
      },
      payin: {
        currencyCode: 'TBD',
        methods: [
          {
            kind: 'TBDOLLARS_BALANCE',
            requiredPaymentDetails: {},
          },
        ],
      },
      requiredClaims: {
        id: '7ce4004c-3c38-4853-968b-e411bafcd945',
        name : 'are you totes legit',
        purpose: 'To ensure the PFI is not a scam',
        format: {
          jwt_vc: {
            alg: ['ES256K', 'EdDSA']
          }
        },

        input_descriptors: [
          {
            id: 'bbdb9b7c-5754-4f46-b63b-590bada959e0',

            constraints: {
              fields: [
                {
                  path: ['$.type[*]'],
                  filter: {
                    type: 'string',
                    const: 'SanctionCredential',
                  },
                },
                {
                  path: ['$.issuer'],
                  filter: {
                    type: 'string',
                    const: issuer,
                  },
                },
              ],
            },
          },
        ],
      },
    },
  })

  try {
    await offering.sign(config.pfiDid[index % 5])
    console.log('Offering signed')
  }
  catch (e) {
    console.log('error', e)
  }
  // offering.sign(config.pfiDid[index % 5])  // Sign with alternating URI

  offering.validate()
  PresentationExchange.validateDefinition({
    presentationDefinition: offering.data.requiredClaims
  })

  console.log(`Offering ${index + 1} created and validated`)
  return offering
}

// Initialize an array of hardcoded offerings
const hardcodedOfferings: Offering[] = await Promise.all(Array.from({ length: 10 }, (_, i) => createRandomOffering(i)))

export class HardcodedOfferingRepository implements OfferingsApi {
  pfi: BearerDid
  pfiHardcodedOfferings: Offering[]

  constructor(pfi: BearerDid) {
    this.pfi = pfi
    this.pfiHardcodedOfferings = hardcodedOfferings.filter((offering) => offering.metadata.from === pfi.uri)
  }
  // Retrieve a single offering if found
  async getOffering(opts: { id: string }): Promise<Offering | undefined> {
    console.log('call for offerings')
    return this.pfiHardcodedOfferings.find((offering) => offering.id === opts.id)
  }

  // Retrieve a list of offerings
  async getOfferings(): Promise<Offering[] | undefined> {
    console.log('get PFI offerings')
    return this.pfiHardcodedOfferings
  }
}

// Export an instance of the repository
// export const OfferingRepository = new HardcodedOfferingRepository()