import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginOwnerThunk, logoutThunk } from './authThunk';
import { toast } from 'react-toastify';

const getUserfromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  user: getUserfromLocalStorage,
  token: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const LoginOwner = createAsyncThunk('auth/LoginOwner', loginOwnerThunk);
export const logoutAccount = createAsyncThunk('auth/Logout', logoutThunk);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginOwner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginOwner.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload?.user;
        state.token = action.payload?.token;
        state.message = 'success';
      })
      .addCase(LoginOwner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(logoutAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAccount.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = '';
        toast.success('Logout Successfully');
      })
      .addCase(logoutAccount.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export default authSlice.reducer;
