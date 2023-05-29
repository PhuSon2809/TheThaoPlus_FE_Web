import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addSportListThunk, getAllSportsThunk, getSportOfOwnerThunk } from './sportThunk';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  sports: [],
  sportsOfOwner: [],
  sport: {},
};

export const getAllSports = createAsyncThunk('sport/get-all-sports', getAllSportsThunk);
export const addSportList = createAsyncThunk('sport/add-sport-list', addSportListThunk);
export const getSportOfOwner = createAsyncThunk('sport/get-sport-of-owner', getSportOfOwnerThunk);

const sportSlice = createSlice({
  name: 'sport',
  initialState,
  reducers: {
    setMessageNoti: (state, action) => {
      state.message = action.payload?.messages;
      toast.info(state.message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sports = [...action.payload?.listSport];
      })
      .addCase(getAllSports.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getSportOfOwner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSportOfOwner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sportsOfOwner = [...action.payload?.ownerSportList];
      })
      .addCase(getSportOfOwner.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(addSportList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSportList.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(addSportList.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error('Add faild!');
      });
  },
});

export const { setMessageNoti } = sportSlice.actions;
export default sportSlice.reducer;
