"use client"
import { createSlice } from "@reduxjs/toolkit"

interface UserState {
  name: string
  username: string
  isLoggedIn: boolean
  avatar: string
  email: string
}

const initialStateUser: UserState = {
  name: "",
  username: "",
  isLoggedIn: false,
  avatar: "",
  email: "",
}

const userSlice = createSlice({
  name: "counter",
  initialState: initialStateUser,
  reducers: {},
})

export default userSlice.reducer
