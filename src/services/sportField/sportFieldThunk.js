import axiosClient from 'src/api/axiosClient';
import { getAllSportFields, setMessageSuccess } from './sportFieldSlice';
import { getSportCenterDetail } from '../sportCenter/sportCenterSlice';

export const getAllSportFieldsThunk = async (sportCenterId, thunkAPI) => {
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

export const getSportFieldDetailThunk = async (sportFieldId, thunkAPI) => {
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

export const createNewSportFieldThunk = async (params, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.post('/sport-field/', params.newSportField);
      if (response) {
        thunkAPI.dispatch(getAllSportFields(params.sportCenterId));
        params.navigate(`/dashboard/sport-center-detail/${params.sportCenterId}`);
      }
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updateSportFieldThunk = async (params, thunkAPI) => {
  console.log(params);
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.put(`/sport-field/${params.sportFieldId}`, params.updateSportFieldObj);
      if (response) {
        thunkAPI.dispatch(getAllSportFields(params.sportCenterId));
        params.navigate(`/dashboard/sport-center-detail/${params.sportCenterId}`);
      }
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deleteSportFieldThunk = async (params, thunkAPI) => {
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

export const activeSportFieldThunk = async (params, thunkAPI) => {
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

export const deactiveSportFieldThunk = async (params, thunkAPI) => {
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
