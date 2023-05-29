import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllSportCentersThunk } from './sportCenterThunk';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  sportCenters: [],
  sportCenter: {},
};

export const getAllSportCenters = createAsyncThunk('sport/get-all-sports-center', getAllSportCentersThunk);

const sportCenterSlice = createSlice({
  name: 'sportCenter',
  initialState,
  reducers: {
    setMessageNoti: (state, action) => {
      state.message = action.payload?.messages;
      toast.info(state.message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSportCenters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSportCenters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sportCenters = [...action.payload?.OwnerSportCenterList];
      })
      .addCase(getAllSportCenters.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setMessageNoti } = sportCenterSlice.actions;
export default sportCenterSlice.reducer;
