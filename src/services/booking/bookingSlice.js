import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  activeBookingThunk,
  createNewBookingThunk,
  deactiveBookingThunk,
  deleteBookingThunk,
  getAllBookingsThunk,
  getBookingDetailThunk,
} from './bookingThunk';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  bookings: [],
  booking: {},
  bookingCalendar: [],
};

export const getAllBookings = createAsyncThunk('booking/get-all-bookings', getAllBookingsThunk);
export const getBookingDetail = createAsyncThunk('booking/get-booking-detail', getBookingDetailThunk);
export const createNewBooking = createAsyncThunk('booking/create-booking', createNewBookingThunk);
export const deleteBooking = createAsyncThunk('booking/delete-booking', deleteBookingThunk);
export const activeBooking = createAsyncThunk('booking/active-booking', activeBookingThunk);
export const deactiveBooking = createAsyncThunk('booking/deactive-booking', deactiveBookingThunk);

const bookingSlice = createSlice({
  name: 'booking',
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.bookings = [...action.payload?.bookingOfOwner];
        state.bookingCalendar = [...action.payload?.bookings];
      })
      .addCase(getAllBookings.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getBookingDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookingDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.booking = { ...action.payload?.getBooking };
      })
      .addCase(getBookingDetail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(createNewBooking.pending, (state) => {
        state.isLoading = true;
        console.log('pending');
      })
      .addCase(createNewBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success('Created new booking successfully');
      })
      .addCase(createNewBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload.data.message);
      })
      .addCase(deleteBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        console.log(action.payload);
      })
      .addCase(deleteBooking.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(activeBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activeBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        console.log(action.payload);
      })
      .addCase(activeBooking.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deactiveBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deactiveBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        console.log(action.payload);
      })
      .addCase(deactiveBooking.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setMessageSuccess, setMessageNoti, setMessageError } = bookingSlice.actions;
export default bookingSlice.reducer;
