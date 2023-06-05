import axiosClient from 'src/api/axiosClient';
import { getAllSports, getSportOfOwner, setMessageNoti } from './sportSlice';

export const getAllSportsThunk = async (_, thunkAPI) => {
  try {
    const response = await axiosClient.getByUrl('/sport/');
    return response;
  } catch (error) {
    console.log(error);
  }
};

//Add to sport list of owner
export const addSportListThunk = async (sportId, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];
  axiosClient.setHeaderAuth(accessToken);
  if (accessToken) {
    const sportIdOb = {
      sportId: sportId,
    };
    await axiosClient
      .put('/sport/sportlist', sportIdOb)
      .then((response) => {
        if (response) {
          thunkAPI.dispatch(getAllSports());
          thunkAPI.dispatch(getSportOfOwner());
          thunkAPI.dispatch(setMessageNoti(response));
        }
      })
      .catch((error) => {
        console.log('sport error thunk: ', error);
        return thunkAPI.rejectWithValue(error);
      });
  }
};

//Get list sport of center
export const getSportOfOwnerThunk = async (_, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.getByUrl('/user/get-sport-list');
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};
