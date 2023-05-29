import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function PrivateRoute({ allowedRoles }) {
  const location = useLocation();

  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];

  const [user, setUser] = useState(accessToken || null);

  return user ? <Outlet /> : <Navigate to={'/login'} state={{ from: location }} replace />;
}

export default PrivateRoute;
