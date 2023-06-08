import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  activeSportFieldThunk,
  createNewSportFieldThunk,
  deactiveSportFieldThunk,
  deleteSportFieldThunk,
  getAllSportFieldsThunk,
  getSportFieldDetailThunk,
  updateSportFieldThunk,
} from './sportFieldThunk';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isEditing: false,
  message: '',
  sportFields: [],
  sportField: {},
};

export const getAllSportFields = createAsyncThunk('sport-field/get-all-sport-fields', getAllSportFieldsThunk);
export const getSportFieldDetail = createAsyncThunk('sport-field/get-sport-field-detail', getSportFieldDetailThunk);
export const createNewSportField = createAsyncThunk('sport-field/create-sport-field', createNewSportFieldThunk);
export const updateSportField = createAsyncThunk('sport-field/update-sport-field', updateSportFieldThunk);
export const deleteSportField = createAsyncThunk('sport-field/delete-sport-field', deleteSportFieldThunk);
export const activeSportField = createAsyncThunk('sport-field/active-sport-field', activeSportFieldThunk);
export const deactiveSportField = createAsyncThunk('sport-field/deactive-sport-field', deactiveSportFieldThunk);

const sportFieldSlice = createSlice({
  name: 'sportField',
  initialState,
  reducers: {
    setMessageSuccess: (state, action) => {
      console.log(action.payload);
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
    setAddSportField: (state) => {
      state.isEditing = false;
    },
    setEditSportField: (state, action) => {
      state.isEditing = true;
      state.sportField = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSportFields.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSportFields.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sportFields = [...action.payload?.SportFieldList];
      })
      .addCase(getAllSportFields.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getSportFieldDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSportFieldDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sportField = { ...action.payload?.getSportField };
      })
      .addCase(getSportFieldDetail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(createNewSportField.pending, (state) => {
        state.isLoading = true;
        console.log('pending');
      })
      .addCase(createNewSportField.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success('Created new sport field successfully');
      })
      .addCase(createNewSportField.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload.data.message);
      })
      .addCase(updateSportField.pending, (state) => {
        state.isLoading = true;
        console.log('pending');
      })
      .addCase(updateSportField.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success('Update sport field successfully');
      })
      .addCase(updateSportField.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload.data.message);
      })
      .addCase(deleteSportField.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSportField.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        console.log(action.payload);
      })
      .addCase(deleteSportField.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(activeSportField.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activeSportField.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        console.log(action.payload);
      })
      .addCase(activeSportField.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deactiveSportField.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deactiveSportField.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        console.log(action.payload);
      })
      .addCase(deactiveSportField.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setMessageSuccess, setMessageNoti, setMessageError, setAddSportField, setEditSportField } =
  sportFieldSlice.actions;
export default sportFieldSlice.reducer;
