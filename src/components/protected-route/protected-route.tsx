import { Navigate, useLocation } from 'react-router-dom';

import { RoutePath } from '@components/app/router';
import { getRouteFromState } from '@components/app/router/get-route-from-state';
import { getIsAuthChecked, getUser } from '@services/slices/auth-slice';
import { useAppSelector } from '@services/store';

import type { ReactElement } from 'react';

type TProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false,
}: TProtectedRouteProps): ReactElement | null => {
  const location = useLocation();
  const isAuthChecked = useAppSelector((state) => getIsAuthChecked(state));
  const user = useAppSelector((state) => getUser(state));

  if (!isAuthChecked) {
    return null;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={RoutePath.Login} state={{ from: location }} replace />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to={getRouteFromState(location.state)} replace />;
  }

  return children;
};
