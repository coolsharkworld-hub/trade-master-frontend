export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'
export const STORE_KEY = process.env.NEXT_PUBLIC_STORE_KEY || 'Qm1cmsW34MAEpgew4hkMe'
export const STRIPE_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_STRIP_PUBLIC_KEY ||
  'pk_test_51Hsx6gKr4ls297Oek0uvxlgHlBntTjwKW2fiB8hC7kRAhGKD2ih3uQPUA11ghqODTklahhX8MzXjtKiCcH2WJaaR006bT62ZkD'

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: 'auth/register',
    LOGIN: 'auth/login'
  },
  CART: {
    ALL: 'cart',
    COUNT: 'cart/count',
    ADD: 'cart',
    REMOVE: 'cart/items',
    CLEAR: 'cart/clear'
  },
  PAYMENT: {
    CREATE: 'payment',
    RETRIEVE: 'payment'
  }
}