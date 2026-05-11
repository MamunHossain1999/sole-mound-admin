/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../api/api"





// Types
interface User {
  name: string
  avatar: string
}

interface UserState {
  name: string | null
  avatar: string | null
  isLoggedIn: boolean
  loading: boolean
  error: string | null
}

// Initial state
const initialState: UserState = {
  name: null,
  avatar: null,
  isLoggedIn: false,
  loading: false,
  error: null,
}

// Async thunk for login
export const loginUser = createAsyncThunk<
  User, // fulfilled payload type
  { email: string; password: string }, // argument type
  { rejectValue: string } // rejectWithValue type
>("user/login", async (credentials, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/login", credentials)
    return res.data as User
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Login failed")
  }
})

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.name = null
      state.avatar = null
      state.isLoggedIn = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.name = action.payload.name
        state.avatar = action.payload.avatar
        state.isLoggedIn = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? "Login failed"
      })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer