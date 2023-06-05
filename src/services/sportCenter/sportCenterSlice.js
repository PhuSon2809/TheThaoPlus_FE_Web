import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  activeSportCenterThunk,
  createNewSportCenterThunk,
  deactiveSportCenterThunk,
  deleteSportCenterThunk,
  getAllSportCentersThunk,
  getSportCenterDetailThunk,
  getSportCentersOfOwnerThunk,
} from './sportCenterThunk';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isEditing: false,
  message: '',
  sportCenters: [],
  sportCenterOfOwner: [],
  sportCenter: {},
};

export const getAllSportCenters = createAsyncThunk('sport/get-all-sports-center', getAllSportCentersThunk);
export const getSportCentersOfOwner = createAsyncThunk('sport/get-sports-center-of-owner', getSportCentersOfOwnerThunk);
export const getSportCenterDetail = createAsyncThunk('sport/get-sports-center-detail', getSportCenterDetailThunk);
export const creatNewSportCenter = createAsyncThunk('sport/create-sports-center', createNewSportCenterThunk);
export const deleteSportCenter = createAsyncThunk('sport/delete-sports-center', deleteSportCenterThunk);
export const activeSportCenter = createAsyncThunk('sport/active-sports-center', activeSportCenterThunk);
export const deactiveSportCenter = createAsyncThunk('sport/deactive-sports-center', deactiveSportCenterThunk);

const sportCenterSlice = createSlice({
  name: 'sportCenter',
  initialState,
  reducers: {
    setMessageSuccess: (state, action) => {
      state.message = action.payload;
      toast.success(state.message);
    },
    setMessageNoti: (state, action) => {
      state.message = action.payload?.messages;
      toast.info(state.message);
    },
    setMessageError: (state, action) => {
      state.message = action.payload?.messages;
      toast.error(state.message);
    },
    setAddSportCenter: (state) => {
      state.isEditing = false;
    },
    setEditSportCenter: (state, action) => {
      state.isEditing = true;
      state.sportCenter = action.payload;
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
      })
      .addCase(getSportCentersOfOwner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSportCentersOfOwner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sportCenterOfOwner = [...action.payload?.sportCenterOfOwner];
      })
      .addCase(getSportCentersOfOwner.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getSportCenterDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSportCenterDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sportCenter = { ...action.payload?.getSportCenter };
      })
      .addCase(getSportCenterDetail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(creatNewSportCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(creatNewSportCenter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(creatNewSportCenter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload?.data.message);
      })
      .addCase(deleteSportCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSportCenter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteSportCenter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload?.data.message);
      })
      .addCase(activeSportCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activeSportCenter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(activeSportCenter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload?.data.message);
      })
      .addCase(deactiveSportCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deactiveSportCenter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deactiveSportCenter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload?.data.message);
      });
  },
});

export const { setMessageSuccess, setMessageNoti, setMessageError, setAddSportCenter, setEditSportCenter } =
  sportCenterSlice.actions;
export default sportCenterSlice.reducer;
