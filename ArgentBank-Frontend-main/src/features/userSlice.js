import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const userGet = createAsyncThunk(
  'user/profile',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(),
        })
      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.message || 'Token not found.');
      }
      const { firstName, lastName, userName } = data.body || {}
      return { firstName, lastName, userName }
    } catch (error) {
      return rejectWithValue(error.message || 'Network or server error.');
    }
  }
)

export const userPut = createAsyncThunk(
  'user/update',
  async ({ token, userName }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ userName })
        }
      )
      if (!response.ok) {
        return rejectWithValue(response.message || 'Token not found.');
      }
      return userName
    } catch (error) {
      return rejectWithValue(error.message || 'Network or server error.');
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: null,
    lastName: null,
    userName: null
  },
  reducers: {
    userLogout: (state) => {
      state.firstName = null
      state.lastName = null
      state.userName = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userGet.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.userName = action.payload.userName;
      })
      .addCase(userPut.fulfilled, (state, action) => {
        state.userName = action.payload;
      })
  },
})

export const { userLogout } = userSlice.actions;
export default userSlice.reducer