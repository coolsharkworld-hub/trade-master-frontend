import { API_ENDPOINTS } from '../configs'
import apiRequest from '../lib/axios'
import { AuthResponse, LoginData, RegisterData } from '../types/auth'

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  return apiRequest({
    method: 'POST',
    url: API_ENDPOINTS.AUTH.REGISTER,
    data
  })
}

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  return apiRequest({
    method: 'POST',
    url: API_ENDPOINTS.AUTH.LOGIN,
    data
  })
}
