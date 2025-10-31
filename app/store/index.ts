import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import { STORE_KEY } from '../configs'
import reducers from './reducers'

const persistConfig = {
  key: STORE_KEY,
  storage,
  whitelist: ['auth', 'cart']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

const persister = persistStore(store)

export type RootState = ReturnType<typeof reducers>

export type AppDispatch = typeof store.dispatch

const { dispatch } = store

const useDispatch = () => useAppDispatch<AppDispatch>()
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector

export { store, persister, dispatch, useSelector, useDispatch }
export * from './reducers/auth'
export * from './reducers/cart'
