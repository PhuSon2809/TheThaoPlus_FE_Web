import Cookie from 'js-cookie';
import axiosClient from 'src/api/axiosClient';

export const loginOwnerThunk = async (params, thunkAPI) => {
  try {
    const res = await axiosClient.post(`/user/owner-login`, params.user);
    Cookie.set('accessToken', res.token);
    Cookie.set('refreshToken', res.user.refreshToken);
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
