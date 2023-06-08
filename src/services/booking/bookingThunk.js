import axiosClient from 'src/api/axiosClient';
import { setMessageSuccess } from './bookingSlice';
import { getSportCenterDetail } from '../sportCenter/sportCenterSlice';

export const getAllBookingsThunk = async (_, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.getByUrl(`/booking/booking-of-owner`);
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getBookingDetailThunk = async (bookingId, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.getByUrl(`/booking/${bookingId}`);
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const createNewBookingThunk = async (params, thunkAPI) => {
  console.log(params);
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.post('/booking/create-booking-for-owner', params.newBookingBody);
      if (response) {
        params.navigate(`/dashboard/booking`);
      }
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deleteBookingThunk = async (params, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.delete(`/sport-field/${params.sportFieldId}/${params.sportCenterId}`);
      if (response) {
        // thunkAPI.dispatch(getAllSportFields(params.sportCenterId));
        thunkAPI.dispatch(setMessageSuccess('Deleted sport field successfully'));
      }
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const activeBookingThunk = async (params, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.put(`/sport-field/unblock-sport-field/${params.sportFieldId}`);
      if (response) {
        // thunkAPI.dispatch(getAllSportFields(params.sportCenterId));
        thunkAPI.dispatch(getSportCenterDetail(params.sportCenterId));
        thunkAPI.dispatch(setMessageSuccess('Active sport field successfully'));
      }
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deactiveBookingThunk = async (params, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.put(`/sport-field/block-sport-field/${params.sportFieldId}`);
      if (response) {
        // thunkAPI.dispatch(getAllSportFields(params.sportCenterId));
        thunkAPI.dispatch(getSportCenterDetail(params.sportCenterId));
        thunkAPI.dispatch(setMessageSuccess('Deactive sport field successfully'));
      }
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};
