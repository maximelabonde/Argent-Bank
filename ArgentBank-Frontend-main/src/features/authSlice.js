import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const authPost = createAsyncThunk(
  'user/login',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Incorrect email or password.');
      }
      const { token } = data.body || {};
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', token);
    } catch (error) {
      return rejectWithValue(error.message || 'Network or server error.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    authLogout: () => {
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
    }
  },
})

export const { authLogout } = authSlice.actions;
export default authSlice.reducer;