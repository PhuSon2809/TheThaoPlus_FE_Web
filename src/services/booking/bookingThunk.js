import axiosClient from 'src/api/axiosClient';
import { getAllSportFields, setMessageSuccess } from './sportFieldSlice';
import { getSportCenterDetail } from '../sportCenter/sportCenterSlice';

export const getAllBookingsThunk = async (sportCenterId, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.getByUrl(`/sport-center/get-sport-field-list/${sportCenterId}`);
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getBookingDetailThunk = async (sportFieldId, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.getByUrl(`/sport-field/${sportFieldId}`);
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const createNewBookingThunk = async (params, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.post('/sport-field/', params.newSportField);
      if (response) {
        params.navigate(`/dashboard/sport-center-detail/${params.sportCenterId}`);
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
        thunkAPI.dispatch(getAllSportFields(params.sportCenterId));
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
        thunkAPI.dispatch(getAllSportFields(params.sportCenterId));
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
        thunkAPI.dispatch(getAllSportFields(params.sportCenterId));
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
