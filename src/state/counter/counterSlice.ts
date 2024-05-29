"use client"
import { createSlice } from "@reduxjs/toolkit"

export interface CounterState {
  value: number
}

const initialStateCounter: CounterState = {
  value: 0,
}

// We know that in Redux the Reducers can't and shouldn't change the global state directly. But the createSlice takes all that configuration under the hood and it's confusing to see the reducers directly trying to mutate the state, but isn't what's happening, we are using redux toolkit which is doing the heavy lifting for us of creating a copy of state first and changing it.

const counterSlice = createSlice({
  name: "counter",
  initialState: initialStateCounter,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

// exporting action and reducers
export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer
