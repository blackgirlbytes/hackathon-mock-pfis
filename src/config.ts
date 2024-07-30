import type { LogLevelDesc } from 'loglevel'
import fs from 'fs/promises'

import 'dotenv/config'

import { BearerDid, DidDht } from '@web5/dids'


export type Environment = 'local' | 'staging' | 'production'
const pfi_path = 'src/pfis/'

export type Config = {
  env: Environment;
  logLevel: LogLevelDesc;
  host: string[];
  port: string[];
  pfiDid: BearerDid[];
  issuerDid: BearerDid;
  allowlist: string[];
  pinPaymentsKey: string;
}

export const config: Config = {
  env: (process.env['ENV'] as Environment) || 'local',
  logLevel: (process.env['LOG_LEVEL'] as LogLevelDesc) || 'info',
  host: [
    'https://aqf-mock-pfis.tbddev.org',
    'https://sls-mock-pfis.tbddev.org',
    'https://ff-mock-pfis.tbddev.org',
    'https://vla-mock-pfis.tbddev.org',
    'https://tt-mock-pfis.tbddev.org'
  ],
  port: ['4000', '5000', '8000', '8080', '9000'],
  pfiDid: await createOrLoadDid(['pfi_1.json', 'pfi_2.json', 'pfi_3.json', 'pfi_4.json', 'pfi_5.json']),
  issuerDid: await createADid('https://mock-idv.tbddev.org', 'issuer.json'),
  pinPaymentsKey: process.env['SEC_PIN_PAYMENTS_SECRET_KEY'],
  allowlist: JSON.parse(process.env['SEC_ALLOWLISTED_DIDS'] || '[]'),
}

async function loadDID(filename) {
  try {
    const data = await fs.readFile(pfi_path + filename, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading from file:', error)
    return false
  }
}

async function createADid(serviceEndpoint: string, filename: string) {
  const existingDid = await loadDID(filename)
  if (existingDid) {
    const bearerDid = await DidDht.import({portableDid: existingDid})
    return bearerDid
  }
  // else create a new one
  const bearerDid = await DidDht.create({
    options: {
      services: [
        {
          id: 'pfi',
          type: 'PFI',
          serviceEndpoint,
        },
      ],
    },
  })
  const portableDid = await bearerDid.export()
  await fs.writeFile(pfi_path + filename, JSON.stringify(portableDid, null, 2))

  return bearerDid
}



async function createOrLoadDid(filenames: string[]): Promise<BearerDid[]> {

  console.log('Setting up dids for server PFIs and Issuer...')
  const pfis: BearerDid[] = []
  const bearerDid1 = await createADid('https://aqf-mock-pfis.tbddev.org', filenames[0])
  const bearerDid2 = await createADid('https://sls-mock-pfis.tbddev.org', filenames[1])
  const bearerDid3 = await createADid('https://ff-mock-pfis.tbddev.org', filenames[2])
  const bearerDid4 = await createADid('https://vla-mock-pfis.tbddev.org', filenames[3])
  const bearerDid5 = await createADid('https://tt-mock-pfis.tbddev.org', filenames[4])


  pfis.push(bearerDid1)
  pfis.push(bearerDid2)
  pfis.push(bearerDid3)
  pfis.push(bearerDid4)
  pfis.push(bearerDid5)

  return pfis
}