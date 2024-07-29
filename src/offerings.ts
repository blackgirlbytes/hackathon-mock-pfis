import { OfferingsApi, Offering, OfferingData } from '@tbdex/http-server'
import { config } from './config.js'
// import fs from 'fs/promises'
import { PresentationExchange } from '@web5/credentials'
import { issuerDid } from './credential-issuer.js'
import { BearerDid } from '@web5/dids'

import * as offerings from './offeringData.js'

// load issuer's did from a file called issuer-did.txt
const issuer = issuerDid


// Offerings order
/*
1. African currency exchanges PFI
2. Another African currency exchanges PFI
3. USD related exchanges PFI
4. EUR related exchanges PFI
5. High liquidity exchanges PFI
*/

const customOfferings = [
  // first set of offerings per PFI
  {data: {...offerings.offeringDataGHSToUSDC}}, // PFI 1
  {data: {...offerings.offeringDataKESToUSD2}}, // PFI 2
  {data: {...offerings.offeringDataUSDToEUR}}, // PFI 3
  {data: {...offerings.offeringDataEURToUSD2}}, // PFI 4
  {data: {...offerings.offeringDataUSDToAUD}}, // PFI 5

  // second set of offerings per PFI
  {data: {...offerings.offeringDataNGNToKES}},
  {data: {...offerings.offeringDataKESToUSDC}},
  {data: {...offerings.offeringDataEURToUSD}},
  {data: {...offerings.offeringDataEURToUSDC}},
  {data: {...offerings.offeringDataUSDToGBP2}},

  // third set of offerings per PFI
  {data: {...offerings.offeringDataKESToUSD}},
  {data: {...offerings.offeringDataNGNToGHS}},
  {data: {...offerings.offeringDataUSDToGBP}},
  {data: {...offerings.offeringDataUSDToEUR2}},
  {data: {...offerings.offeringDataUSDToKES2}},

  // fourth set of offerings per PFI
  {data: {...offerings.offeringDataUSDToKES}},
  {data: {...offerings.offeringDataBTCToNGN}},
  {data: {...offerings.offeringDataUSDToBTC}},
  {data: {...offerings.offeringDataEURToGBP}},
  {data: {...offerings.offeringDataUSDToMXN}},
]

// Function to create a randomized offering
async function createRandomOffering(index: number): Promise<Offering> {

  const customPFIIndex = index % 5 // 5 is number of hardcoded PFI DIDs
  const offering = Offering.create({
    metadata: {
      from: config.pfiDid[customPFIIndex].uri,  // Alternates between 5 PFI URIs
      protocol: '1.0'
    },
    data: customOfferings[index].data //chooseRandomOfferingData(customPFIIndex),
  })

  try {
    await offering.sign(config.pfiDid[customPFIIndex])
    // console.log('Offering signed')
  }
  catch (e) {
    console.log('error', e)
  }
  // offering.sign(config.pfiDid[index % 5])  // Sign with alternating URI

  try {
    offering.validate()
    PresentationExchange.validateDefinition({
      presentationDefinition: offering.data.requiredClaims
    })
  } catch (error) {
    console.error(`Offering ${index + 1} failed validation: ${error}`)
  }


  // console.log(`Offering ${index + 1} created and validated`)
  return offering
}

// Initialize an array of hardcoded offerings
const hardcodedOfferings: Offering[] = await Promise.all(Array.from({ length: 20 }, (_, i) => createRandomOffering(i)))

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
