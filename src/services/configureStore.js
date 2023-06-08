import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import sportReducer from './sport/sportSlice';
import sportCenterReducer from './sportCenter/sportCenterSlice';
import sportFieldReducer from './sportField/sportFieldSlice';
import bookingReducer from './booking/bookingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sport: sportReducer,
    sportCenter: sportCenterReducer,
    sportField: sportFieldReducer,
    booking: bookingReducer,
  },
});
