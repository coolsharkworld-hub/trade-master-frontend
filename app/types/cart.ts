import { APIResponse } from './response'

export interface CartItem {
    id: number
    courseId: number
    userId: number
    addedAt: string
}

export interface CartState {
    items: CartItem[]
    count: number
}

export interface CartResponse extends APIResponse {
    cart: CartItem[]
}

export interface AddCartResponse extends APIResponse {
    item: CartItem
}