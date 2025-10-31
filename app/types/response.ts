export interface APIResponse {
  success: boolean
  message: string
}

export interface ResponseError extends APIResponse {
  error: string
}
