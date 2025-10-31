import { APIResponse } from './response'

export interface PaymentResponse extends APIResponse {
  intent: {
    client_secret: string
  }
}

export type PaymentBrandType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'diners' | 'jcb' | 'unionpay' | 'unknown'
