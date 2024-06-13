"use client"
import { createSlice } from "@reduxjs/toolkit"
import { clear } from "console"

interface UserState {
  id: string
  name: string
  username: string
  isLoggedIn: boolean
  avatar: string
  email: string
  provider: string
  role: string
  token: string
  expiresAt: Date
}

const initialStateUser: UserState = {
  id: "",
  name: "",
  username: "",
  isLoggedIn: false,
  avatar: "",
  email: "",
  provider: "",
  role: "",
  token: "",
  expiresAt: new Date(),
}

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    setUser: (state, action) => {
      // Fields from Next.js session
      state.expiresAt = action.payload.expiresAt || new Date()
      state.name = action.payload.name || ""
      state.email = action.payload.email || ""
      state.avatar = action.payload.image || ""
      state.isLoggedIn =
        action.payload.isLoggedIn !== undefined
          ? action.payload.isLoggedIn
          : true // Assuming session presence means logged in

      // Fields for future custom login integration
      // If the payload doesn't have these fields, keep the existing values (or set defaults if you prefer)
      state.id = action.payload.id || state.id
      state.username = action.payload.username || state.username
      state.provider = action.payload.provider || state.provider
      state.role = action.payload.role || state.role
      state.token = action.payload.token || state.token

      // If expiresAt is not a Date object, convert it
      if (!(state.expiresAt instanceof Date)) {
        state.expiresAt = new Date(state.expiresAt)
      }
    },
    clearUser: (state) => {
      state.id = ""
      state.name = ""
      state.username = ""
      state.isLoggedIn = false
      state.avatar = ""
      state.email = ""
      state.provider = ""
      state.role = ""
      state.token = ""
      state.expiresAt = new Date()
    },
  },
})

export default userSlice.reducer
export const { setUser, clearUser } = userSlice.actions
