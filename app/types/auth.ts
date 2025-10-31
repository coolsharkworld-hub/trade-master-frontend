import { APIResponse } from './response'
import { User } from './user'

export interface AuthState {
  isLoggedIn: boolean
  user: User | null
  token: string | null
}

export interface RegisterData extends Omit<User, 'id'> {
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse extends APIResponse {
  user: User
  token: string
}

export interface RegisterError {
  message: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}
