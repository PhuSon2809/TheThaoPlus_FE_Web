import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginOwnerThunk, logoutThunk, registerOwnerThunk, updateOwnerThunk } from './authThunk';
import { toast } from 'react-toastify';

const getUserfromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  user: getUserfromLocalStorage,
  token: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  isEditing: false,
  message: '',
};

export const RegisterOwner = createAsyncThunk('auth/RegisterOwner', registerOwnerThunk);
export const LoginOwner = createAsyncThunk('auth/LoginOwner', loginOwnerThunk);
export const logoutAccount = createAsyncThunk('auth/Logout', logoutThunk);
export const updateAccount = createAsyncThunk('auth/UpdateOwner', updateOwnerThunk);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMessageSuccess: (state, action) => {
      state.message = action.payload;
      toast.success(state.message);
    },
    setEditUser: (state) => {
      state.isEditing = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterOwner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterOwner.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(RegisterOwner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload?.data.message);
      })
      .addCase(LoginOwner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginOwner.fulfilled, (state, action) => {
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
        toast.error(action.payload);
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
      })
      .addCase(updateAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload?.userUpdated;
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        console.log(action.payload);
        toast.error('Phone number is already!');
        // toast.error(action.payload);
      });
  },
});

export const { setMessageSuccess, setEditUser } = authSlice.actions;
export default authSlice.reducer;
