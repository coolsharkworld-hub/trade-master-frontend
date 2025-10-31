import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem, CartState } from "@/app/types/cart";

const initialState: CartState = {
    items: [],
    count: 0
}

const cartSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        fetchAllCartItems(state, action: PayloadAction<CartItem[]>) {
            state.items = action.payload
            state.count = state.items.length
        },
        addItemToCart(state, action: PayloadAction<CartItem>) {
            state.items.push(action.payload)
            state.count ++
        },
        removeItemFromCart(state, action: PayloadAction<number>) {
            state.items.forEach((item, index) => {
                if (item.courseId == action.payload) {
                    state.items.splice(index, 1)
                    state.count --
                }
            })
        },
        clearCart(state) {
            state.items = []
            state.count = 0
        }
    }
})

export default cartSlice.reducer

export const { fetchAllCartItems, addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions