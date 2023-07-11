import Cookie from 'js-cookie';
import axiosClient from 'src/api/axiosClient';
import { setMessageSuccess } from './authSlice';

export const registerOwnerThunk = async (params, thunkAPI) => {
  try {
    const res = await axiosClient.post(`/user/register-owner`, params.newOwner);
    if (res) {
      thunkAPI.dispatch(setMessageSuccess('Craete owner account successfully'));
      params.navigate('/login', { replace: true });
    }
    return res;
  } catch (error) {
    console.log('login error thunk: ', error);
    return thunkAPI.rejectWithValue(error);
  }
};

export const loginOwnerThunk = async (params, thunkAPI) => {
  try {
    const res = await axiosClient.post(`/user/owner-login`, params.user);
    Cookie.set('accessToken', res.token);
    Cookie.set('refreshToken', res.user?.refreshToken);
    const userLocalStorage = {
      firstname: res.user.firstname,
      lastname: res.user.lastname,
      email: res.user.email,
      phone: res.user.phone,
      image: res.user.image,
      gender: res.user.gender,
      YOB: res.user.YOB,
      role: res.user?.role.name,
    };
    params.navigate('/dashboard/app', { replace: true });
    localStorage.setItem('userInfo', JSON.stringify(userLocalStorage));
    return res;
  } catch (error) {
    console.log('login error thunk: ', error);
    const message = await error.data.message;
    return thunkAPI.rejectWithValue(message);
  }
};

export const logoutThunk = async (navigate, thunkAPI) => {
  try {
    // const res = await axiosClient.getByUrl(`/user/logout`);
    Cookie.remove('refreshToken');
    Cookie.remove('accessToken');
    Cookie.remove('userInfo');

    navigate('/login');
    localStorage.removeItem('userInfo');
  } catch (error) {
    console.log('logout error thunk: ', error);
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateOwnerThunk = async (params, thunkAPI) => {
  console.log(params);
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      console.log('Go update');
      const response = await axiosClient.put(`/user/edit`, params.updateOwner);
      if (response) {
        console.log(response);

        const userLocalStorage = {
          firstname: response.userUpdated.firstname,
          lastname: response.userUpdated.lastname,
          email: response.userUpdated.email,
          phone: response.userUpdated.phone,
          image: response.userUpdated.image,
          gender: response.userUpdated.gender,
          YOB: response.userUpdated.YOB,
          role: response.userUpdated?.role.name,
        };
        localStorage.setItem('userInfo', JSON.stringify(userLocalStorage));
        thunkAPI.dispatch(setMessageSuccess('Update user successfully'));
      }
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};
