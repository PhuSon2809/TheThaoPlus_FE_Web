import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute() {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'))
    ?.split('=')[1];
  const [user, setUser] = useState(accessToken || null);

  return user ? <Navigate to={'/dashboard/app'} /> : <Outlet />;
}
