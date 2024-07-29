import { OfferingData } from '@tbdex/http-server'
import { issuerDid } from './credential-issuer.js'

const issuer = issuerDid

export const offeringDataGHSToUSDC: OfferingData = {
  description: `Exchange your Ghanaian Cedis for USDC`,
  payoutUnitsPerPayinUnit: '0.10', // Competing exchange rate
  payout: {
    currencyCode: 'USDC',
    methods: [
      {
        kind: 'USDC_WALLET_ADDRESS',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USDC Required Payment Details',
          'type': 'object',
          'required': [
            'address',
          ],
          'additionalProperties': false,
          'properties': {
            'address': {
              'title': 'USDC Wallet Address',
              'description': 'Wallet address to pay out USDC to',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'GHS',
    methods: [
      {
        kind: 'GHS_BANK_TRANSFER',
        requiredPaymentDetails: {},
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataNGNToKES: OfferingData = {
  description: `Exchange your Nigerian Naira for Kenyan Shilling`,
  payoutUnitsPerPayinUnit: '0.30',
  payout: {
    currencyCode: 'KES',
    methods: [
      {
        kind: 'KES_BANK_TRANSFER',
        estimatedSettlementTime: 86400, // 24 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'KES Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'KES Bank Account Number',
              'description': 'Bank account number to pay out KES to',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'NGN',
    methods: [
      {
        kind: 'NGN_BANK_TRANSFER',
        requiredPaymentDetails: {},
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataKESToUSD: OfferingData = {
  description: `Exchange your Kenyan Shilling for US Dollars`,
  payoutUnitsPerPayinUnit: '0.007',
  payout: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USD Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'routingNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'USD Bank Account Number',
              'description': 'Bank account number to pay out USD to',
              'type': 'string'
            },
            'routingNumber': {
              'title': 'USD Bank Routing Number',
              'description': 'Bank routing number for the USD account',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'KES',
    methods: [
      {
        kind: 'KES_BANK_TRANSFER',
        requiredPaymentDetails: {},
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataUSDToKES: OfferingData = {
  description: `Exchange your US Dollars for Kenyan Shilling`,
  payoutUnitsPerPayinUnit: '140.00',
  payout: {
    currencyCode: 'KES',
    methods: [
      {
        kind: 'KES_BANK_TRANSFER',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'KES Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'KES Bank Account Number',
              'description': 'Bank account number to pay out KES to',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USD Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'routingNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'USD Bank Account Number',
              'description': 'Bank account number to pay in USD',
              'type': 'string'
            },
            'routingNumber': {
              'title': 'USD Bank Routing Number',
              'description': 'Bank routing number for the USD account',
              'type': 'string'
            },
          }
        },
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataKESToUSD2: OfferingData = {
  description: `Exchange your Kenyan Shilling for US Dollars`,
  payoutUnitsPerPayinUnit: '0.0082',
  payout: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USD Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'routingNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'USD Bank Account Number',
              'description': 'Bank account number to pay out USD to',
              'type': 'string'
            },
            'routingNumber': {
              'title': 'USD Bank Routing Number',
              'description': 'Bank routing number for the USD account',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'KES',
    methods: [
      {
        kind: 'KES_BANK_TRANSFER',
        requiredPaymentDetails: {},
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataKESToUSDC: OfferingData = {
  description: `Exchange your Kenyan Shilling for USDC`,
  payoutUnitsPerPayinUnit: '0.0071', // Competing exchange rate
  payout: {
    currencyCode: 'USDC',
    methods: [
      {
        kind: 'USDC_WALLET_ADDRESS',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USDC Required Payment Details',
          'type': 'object',
          'required': [
            'address',
          ],
          'additionalProperties': false,
          'properties': {
            'address': {
              'title': 'USDC Wallet Address',
              'description': 'Wallet address to pay out USDC to',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'KES',
    methods: [
      {
        kind: 'KES_BANK_TRANSFER',
        requiredPaymentDetails: {},
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataNGNToGHS: OfferingData = {
  description: `Exchange your Nigerian Naira for Ghanaian Cedis`,
  payoutUnitsPerPayinUnit: '0.015',
  payout: {
    currencyCode: 'GHS',
    methods: [
      {
        kind: 'GHS_BANK_TRANSFER',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'GHS Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'GHS Bank Account Number',
              'description': 'Bank account number to pay out GHS to',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'NGN',
    methods: [
      {
        kind: 'NGN_BANK_TRANSFER',
        requiredPaymentDetails: {},
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataBTCToNGN: OfferingData = {
  description: `Exchange your Bitcoin for Nigerian Naira`,
  payoutUnitsPerPayinUnit: '1480000.00',
  payout: {
    currencyCode: 'NGN',
    methods: [
      {
        kind: 'NGN_BANK_TRANSFER',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'NGN Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'NGN Bank Account Number',
              'description': 'Bank account number to pay out NGN to',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'BTC',
    methods: [
      {
        kind: 'BTC_WALLET_ADDRESS',
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'BTC Required Payment Details',
          'type': 'object',
          'required': [
            'address',
          ],
          'additionalProperties': false,
          'properties': {
            'address': {
              'title': 'BTC Wallet Address',
              'description': 'Wallet address to pay in BTC',
              'type': 'string'
            },
          }
        },
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataUSDToEUR: OfferingData = {
  description: `Exchange your US Dollars for Euros`,
  payoutUnitsPerPayinUnit: '0.85',
  payout: {
    currencyCode: 'EUR',
    methods: [
      {
        kind: 'EUR_BANK_TRANSFER',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'EUR Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'IBAN',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'EUR Bank Account Number',
              'description': 'Bank account number to pay out EUR to',
              'type': 'string'
            },
            'IBAN': {
              'title': 'EUR IBAN',
              'description': 'International Bank Account Number for the EUR account',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USD Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'routingNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'USD Bank Account Number',
              'description': 'Bank account number to pay in USD',
              'type': 'string'
            },
            'routingNumber': {
              'title': 'USD Bank Routing Number',
              'description': 'Bank routing number for the USD account',
              'type': 'string'
            },
          }
        },
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataEURToUSD: OfferingData = {
  description: `Exchange your Euros for US Dollars`,
  payoutUnitsPerPayinUnit: '1.17',
  payout: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USD Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'routingNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'USD Bank Account Number',
              'description': 'Bank account number to pay out USD to',
              'type': 'string'
            },
            'routingNumber': {
              'title': 'USD Bank Routing Number',
              'description': 'Bank routing number for the USD account',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'EUR',
    methods: [
      {
        kind: 'EUR_BANK_TRANSFER',
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'EUR Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'IBAN',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'EUR Bank Account Number',
              'description': 'Bank account number to pay in EUR',
              'type': 'string'
            },
            'IBAN': {
              'title': 'EUR IBAN',
              'description': 'International Bank Account Number for the EUR account',
              'type': 'string'
            },
          }
        },
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataUSDToGBP: OfferingData = {
  description: `Exchange your US Dollars for British Pounds`,
  payoutUnitsPerPayinUnit: '0.75',
  payout: {
    currencyCode: 'GBP',
    methods: [
      {
        kind: 'GBP_BANK_TRANSFER',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'GBP Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'sortCode',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'GBP Bank Account Number',
              'description': 'Bank account number to pay out GBP to',
              'type': 'string'
            },
            'sortCode': {
              'title': 'GBP Sort Code',
              'description': 'Bank sort code for the GBP account',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USD Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'routingNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'USD Bank Account Number',
              'description': 'Bank account number to pay in USD',
              'type': 'string'
            },
            'routingNumber': {
              'title': 'USD Bank Routing Number',
              'description': 'Bank routing number for the USD account',
              'type': 'string'
            },
          }
        },
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataUSDToBTC: OfferingData = {
  description: `Exchange your US Dollars for Bitcoin`,
  payoutUnitsPerPayinUnit: '0.000033',
  payout: {
    currencyCode: 'BTC',
    methods: [
      {
        kind: 'BTC_WALLET_ADDRESS',
        estimatedSettlementTime: 3600, // 1 hour in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'BTC Required Payment Details',
          'type': 'object',
          'required': [
            'address',
          ],
          'additionalProperties': false,
          'properties': {
            'address': {
              'title': 'BTC Wallet Address',
              'description': 'Wallet address to pay out BTC to',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USD Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'routingNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'USD Bank Account Number',
              'description': 'Bank account number to pay in USD',
              'type': 'string'
            },
            'routingNumber': {
              'title': 'USD Bank Routing Number',
              'description': 'Bank routing number for the USD account',
              'type': 'string'
            },
          }
        },
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}
export const offeringDataEURToUSD2: OfferingData = {
  description: `Exchange your Euros for US Dollars`,
  payoutUnitsPerPayinUnit: '1.09',
  payout: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USD Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'routingNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'USD Bank Account Number',
              'description': 'Bank account number to pay out USD to',
              'type': 'string'
            },
            'routingNumber': {
              'title': 'USD Bank Routing Number',
              'description': 'Bank routing number for the USD account',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'EUR',
    methods: [
      {
        kind: 'EUR_BANK_TRANSFER',
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'EUR Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'IBAN',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'EUR Bank Account Number',
              'description': 'Bank account number to pay in EUR',
              'type': 'string'
            },
            'IBAN': {
              'title': 'EUR IBAN',
              'description': 'International Bank Account Number for the EUR account',
              'type': 'string'
            },
          }
        },
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataEURToUSDC: OfferingData = {
  description: `Exchange your Euros for USDC`,
  payoutUnitsPerPayinUnit: '1.18',
  payout: {
    currencyCode: 'USDC',
    methods: [
      {
        kind: 'USDC_WALLET_ADDRESS',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USDC Required Payment Details',
          'type': 'object',
          'required': [
            'address',
          ],
          'additionalProperties': false,
          'properties': {
            'address': {
              'title': 'USDC Wallet Address',
              'description': 'Wallet address to pay out USDC to',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'EUR',
    methods: [
      {
        kind: 'EUR_BANK_TRANSFER',
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'EUR Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'IBAN',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'EUR Bank Account Number',
              'description': 'Bank account number to pay in EUR',
              'type': 'string'
            },
            'IBAN': {
              'title': 'EUR IBAN',
              'description': 'International Bank Account Number for the EUR account',
              'type': 'string'
            },
          }
        },
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataUSDToEUR2: OfferingData = {
  description: `Exchange your US Dollars for Euros`,
  payoutUnitsPerPayinUnit: '0.92',
  payout: {
    currencyCode: 'EUR',
    methods: [
      {
        kind: 'EUR_BANK_TRANSFER',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'EUR Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'IBAN',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'EUR Bank Account Number',
              'description': 'Bank account number to pay out EUR to',
              'type': 'string'
            },
            'IBAN': {
              'title': 'EUR IBAN',
              'description': 'International Bank Account Number for the EUR account',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USD Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'routingNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'USD Bank Account Number',
              'description': 'Bank account number to pay in USD',
              'type': 'string'
            },
            'routingNumber': {
              'title': 'USD Bank Routing Number',
              'description': 'Bank routing number for the USD account',
              'type': 'string'
            },
          }
        },
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataEURToGBP: OfferingData = {
  description: `Exchange your Euros for British Pounds`,
  payoutUnitsPerPayinUnit: '0.86',
  payout: {
    currencyCode: 'GBP',
    methods: [
      {
        kind: 'GBP_BANK_TRANSFER',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'GBP Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'sortCode',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'GBP Bank Account Number',
              'description': 'Bank account number to pay out GBP to',
              'type': 'string'
            },
            'sortCode': {
              'title': 'GBP Sort Code',
              'description': 'Bank sort code for the GBP account',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'EUR',
    methods: [
      {
        kind: 'EUR_BANK_TRANSFER',
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'EUR Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'IBAN',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'EUR Bank Account Number',
              'description': 'Bank account number to pay in EUR',
              'type': 'string'
            },
            'IBAN': {
              'title': 'EUR IBAN',
              'description': 'International Bank Account Number for the EUR account',
              'type': 'string'
            },
          }
        },
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}
export const offeringDataUSDToAUD: OfferingData = {
  description: `Exchange your US Dollars for Australian Dollars`,
  payoutUnitsPerPayinUnit: '1.30',
  payout: {
    currencyCode: 'AUD',
    methods: [
      {
        kind: 'AUD_BANK_TRANSFER',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'AUD Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'BSB',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'AUD Bank Account Number',
              'description': 'Bank account number to pay out AUD to',
              'type': 'string'
            },
            'BSB': {
              'title': 'AUD BSB',
              'description': 'Bank State Branch (BSB) number for the AUD account',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USD Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'routingNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'USD Bank Account Number',
              'description': 'Bank account number to pay in USD',
              'type': 'string'
            },
            'routingNumber': {
              'title': 'USD Bank Routing Number',
              'description': 'Bank routing number for the USD account',
              'type': 'string'
            },
          }
        },
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataUSDToGBP2: OfferingData = {
  description: `Exchange your US Dollars for British Pounds`,
  payoutUnitsPerPayinUnit: '0.78',
  payout: {
    currencyCode: 'GBP',
    methods: [
      {
        kind: 'GBP_BANK_TRANSFER',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'GBP Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'sortCode',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'GBP Bank Account Number',
              'description': 'Bank account number to pay out GBP to',
              'type': 'string'
            },
            'sortCode': {
              'title': 'GBP Sort Code',
              'description': 'Bank sort code for the GBP account',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USD Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'routingNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'USD Bank Account Number',
              'description': 'Bank account number to pay in USD',
              'type': 'string'
            },
            'routingNumber': {
              'title': 'USD Bank Routing Number',
              'description': 'Bank routing number for the USD account',
              'type': 'string'
            },
          }
        },
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataUSDToKES2: OfferingData = {
  description: `Exchange your US Dollars for Kenyan Shilling`,
  payoutUnitsPerPayinUnit: '129.94',
  payout: {
    currencyCode: 'KES',
    methods: [
      {
        kind: 'KES_BANK_TRANSFER',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'KES Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'KES Bank Account Number',
              'description': 'Bank account number to pay out KES to',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USD Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'routingNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'USD Bank Account Number',
              'description': 'Bank account number to pay in USD',
              'type': 'string'
            },
            'routingNumber': {
              'title': 'USD Bank Routing Number',
              'description': 'Bank routing number for the USD account',
              'type': 'string'
            },
          }
        },
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}

export const offeringDataUSDToMXN: OfferingData = {
  description: `Exchange your US Dollars for Mexican Pesos`,
  payoutUnitsPerPayinUnit: '20.00',
  payout: {
    currencyCode: 'MXN',
    methods: [
      {
        kind: 'MXN_BANK_TRANSFER',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'MXN Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'CLABE',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'MXN Bank Account Number',
              'description': 'Bank account number to pay out MXN to',
              'type': 'string'
            },
            'CLABE': {
              'title': 'MXN CLABE',
              'description': 'Clave Bancaria Estandarizada (CLABE) for the MXN account',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USD Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'routingNumber',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'USD Bank Account Number',
              'description': 'Bank account number to pay in USD',
              'type': 'string'
            },
            'routingNumber': {
              'title': 'USD Bank Routing Number',
              'description': 'Bank routing number for the USD account',
              'type': 'string'
            },
          }
        },
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
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
}
