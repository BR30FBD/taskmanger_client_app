// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../constant';
import { toast } from 'react-toastify';
export const signupUser = createAsyncThunk(
  'auth/register',
  async ({ userData, navigate }, thunkAPI) => {
    console.log("userData",userData);
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/auth/register`, userData);
    toast.success('Signup successful!');
    navigate('/login');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : 'Signup failed'
      );
    }
  }
);
export const signinUser = createAsyncThunk(
    'auth/login',
    async ({ userData, navigate }, thunkAPI) => {
      try {
        const response = await axios.post(`${REACT_APP_API_URL}/api/auth/login`, userData);
        sessionStorage.setItem('token', response.data.token);
        toast.success('Signin successful!');
        navigate('/tasks'); // Redirect to dashboard (or your chosen route) after signin
        return response.data;
      } catch (error) {
        const errMsg =
          error.response && error.response.data
            ? error.response.data
            : 'Signin failed';
        toast.error(errMsg);
        return thunkAPI.rejectWithValue(errMsg);
      }
    }
  );
  
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    // You can add synchronous reducers here if needed.
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        toast.success(action.payload?.errors);
        // state.error = action.payload;
      })
         // Signin handlers
         .addCase(signinUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(signinUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(signinUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
  },
});

export default authSlice.reducer;
