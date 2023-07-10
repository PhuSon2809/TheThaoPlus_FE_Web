import { Navigate, Route, Routes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
import {
  AddSportCenterPage,
  AllSportPage,
  DashboardAppPage,
  LoginPage,
  Page404,
  RegisterPage,
  SportCenterDetailPage,
  SportCenterPage,
  SportPage,
  BookingPage,
  BookingCalendarPage,
  AddSportFieldPage,
  AddBooking,
  PaymentPage,
} from 'src/pages';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const publicRoute = [
  {
    key: 'login',
    path: 'login',
    component: <LoginPage />,
    index: true,
  },
  {
    key: 'register',
    path: 'register',
    component: <RegisterPage />,
    index: false,
  },
];

export const ownerRoute = [
  {
    path: 'app',
    component: <DashboardAppPage />,
  },
  {
    path: 'sport',
    component: <SportPage />,
  },
  {
    path: 'all-sport-system',
    component: <AllSportPage />,
  },
  {
    path: 'sport-center',
    component: <SportCenterPage />,
  },
  {
    path: 'add-sport-center',
    component: <AddSportCenterPage />,
  },
  {
    path: 'sport-center-detail/:id',
    component: <SportCenterDetailPage />,
  },
  {
    path: 'add-sport-field/:id',
    component: <AddSportFieldPage />,
  },
  {
    path: 'booking',
    component: <BookingPage />,
  },
  {
    path: 'add-booking',
    component: <AddBooking />,
  },
  {
    path: 'booking-calendar',
    component: <BookingCalendarPage />,
  },
  {
    path: 'payment',
    component: <PaymentPage />,
  },
];

function Router() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route element={<Navigate to="/login" />} index={true} />
        {publicRoute.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Route>

      <Route element={<SimpleLayout />}>
        <Route element={<Navigate to="/dashboard/app" />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<Page404 />} />
      </Route>

      <Route path="*" element={<Navigate to="/404" replace />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<Navigate to="/dashboard/app" />} index={true} />
          {ownerRoute.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
