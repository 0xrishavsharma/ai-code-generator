"use client"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import counterReducer from "@/state/counter/counterSlice"
import userReducer from "@/state/user/userSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import persistStore from "redux-persist/es/persistStore"

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register", "rehydrate"],
      },
    }),
})

// we have configured our store now we need to connect it with our React/Next application. As React can't directly talk to Redux we need to create a Provider to bridge this gap

// As we are working with typescript we need to create two important types that'll help us work with the Redux store seamlessly

// So, here we are using the return type of the getState function provided by the store and using it as the RootState.

// Whenever we need to access the state using a selector in any React component, we'll define the state using RootState and then we'll have access to all of our state in Typescript

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>

// AppDispatch will come handy when we will be doing async actions using our useDispatch hook
export type AppDispatch = typeof store.dispatch
