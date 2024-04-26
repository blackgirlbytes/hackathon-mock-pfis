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
  host: ['http://localhost:8000', 'http://localhost:9000', 'http://localhost:3000'],
  port: ['8000', '9000', '3000'],
  pfiDid: await createOrLoadDid(['pfi_0.json', 'pfi_1.json']),
  pinPaymentsKey: process.env['SEC_PIN_PAYMENTS_SECRET_KEY'],
  allowlist: JSON.parse(process.env['SEC_ALLOWLISTED_DIDS'] || '[]'),
}




async function createOrLoadDid(filenames: string[]): Promise<BearerDid[]> {

  console.log('Creating new dids for server PFIs...')
  const pfis: BearerDid[] = []
  const bearerDid_0 = await DidDht.create({
    options: {
      services: [
        {
          id: 'pfi',
          type: 'PFI',
          serviceEndpoint: 'http://localhost:8000',
        },
      ],
    },
  })
  const bearerDid_1 = await DidDht.create({
    options: {
      services: [
        {
          id: 'pfi',
          type: 'PFI',
          serviceEndpoint: 'http://localhost:9000',
        },
      ],
    },
  })
  pfis.push(bearerDid_0)
  pfis.push(bearerDid_1)

  const portableDid_0 = await bearerDid_0.export()
  const portableDid_1 = await bearerDid_1.export()
  await fs.writeFile(filenames[0], JSON.stringify(portableDid_0, null, 2))
  await fs.writeFile(filenames[1], JSON.stringify(portableDid_1, null, 2))
  return pfis

}