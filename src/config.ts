import type { LogLevelDesc } from 'loglevel'
import fs from 'fs/promises'

import 'dotenv/config'

import { BearerDid, DidDht, PortableDid } from '@web5/dids'


export type Environment = 'local' | 'staging' | 'production'

export type Config = {
  env: Environment;
  logLevel: LogLevelDesc;
  host: string[];
  port: string[];
  pfiDid: BearerDid[];
  allowlist: string[];
  pinPaymentsKey: string;
}

export const config: Config = {
  env: (process.env['ENV'] as Environment) || 'local',
  logLevel: (process.env['LOG_LEVEL'] as LogLevelDesc) || 'info',
  host: [ 'http://localhost:4000',  'http://localhost:5000', 'http://localhost:8000',  'http://localhost:8080', 'http://localhost:9000'],
  port: ['4000', '5000', '8000', '8080', '9000'],
  pfiDid: await createOrLoadDid(['pfi_1.json', 'pfi_2.json', 'pfi_3.json', 'pfi_4.json', 'pfi_5.json']),
  pinPaymentsKey: process.env['SEC_PIN_PAYMENTS_SECRET_KEY'],
  allowlist: JSON.parse(process.env['SEC_ALLOWLISTED_DIDS'] || '[]'),
}

async function createADid(serviceEndpoint: string) {
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
  return bearerDid
}



async function createOrLoadDid(filenames: string[]): Promise<BearerDid[]> {

  console.log('Creating new dids for server PFIs...')
  const pfis: BearerDid[] = []
  const bearerDid1 = await createADid('http://localhost:4000')
  const bearerDid2 = await createADid('http://localhost:5000')
  const bearerDid3 = await createADid('http://localhost:8000')
  const bearerDid4 = await createADid('http://localhost:8080')
  const bearerDid5 = await createADid('http://localhost:9000')


  pfis.push(bearerDid1)
  pfis.push(bearerDid2)
  pfis.push(bearerDid3)
  pfis.push(bearerDid4)
  pfis.push(bearerDid5)

  const portableDid1 = await bearerDid1.export()
  const portableDid2 = await bearerDid2.export()
  const portableDid3 = await bearerDid3.export()
  const portableDid4 = await bearerDid4.export()
  const portableDid5 = await bearerDid5.export()

  await fs.writeFile(filenames[0], JSON.stringify(portableDid1, null, 2))
  await fs.writeFile(filenames[1], JSON.stringify(portableDid2, null, 2))
  await fs.writeFile(filenames[2], JSON.stringify(portableDid3, null, 2))
  await fs.writeFile(filenames[3], JSON.stringify(portableDid4, null, 2))
  await fs.writeFile(filenames[4], JSON.stringify(portableDid5, null, 2))

  return pfis
}