import { API_ENDPOINTS } from "../configs";
import apiRequest from "../lib/axios";
import { AddCartResponse, CartResponse } from "../types/cart";
import { APIResponse } from "../types/response";

export const getCartItems = async (bought: boolean): Promise<CartResponse> => {
    return apiRequest({
        method: 'GET',
        url: API_ENDPOINTS.CART.ALL,
        params: { bought }
    })
}

export const addToCart = async (courseId: number): Promise<AddCartResponse> => {
    console.log(courseId)
    return apiRequest({
        method: 'POST',
        url: API_ENDPOINTS.CART.ADD,
        data: {courseId}
    })
}

export const removeFromCart = async (courseId: number): Promise<APIResponse> => {
    return apiRequest({
        method: 'DELETE',
        url: `${API_ENDPOINTS.CART.REMOVE}/${courseId}`,
        data: {courseId}
    })
}

export const clearAllFromCart = async (bought: boolean): Promise<APIResponse> => {
    return apiRequest({
        method: 'DELETE',
        url: API_ENDPOINTS.CART.CLEAR,
        params: { bought }
    })
}