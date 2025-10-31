import { API_ENDPOINTS } from '../configs'
import apiRequest from '../lib/axios'
import { PaymentResponse } from '../types/payment'

export const createPayment = async (amount: number, currency: string): Promise<PaymentResponse> => {
  return await apiRequest({
    method: 'POST',
    url: API_ENDPOINTS.PAYMENT.CREATE,
    data: {
      amount,
      currency
    }
  })
}

export const retrievePayment = async (id: string): Promise<PaymentResponse> => {
  return await apiRequest({
    method: 'GET',
    url: `API_ENDPOINTS.PAYMENT.RETRIEVE/${id}`
  })
}
