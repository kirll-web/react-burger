import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@components/layout';
import { ModalFeedOrder } from '@components/modal-feed-order';
import { ModalIngredients } from '@components/modal-ingredients';
import { ModalProfileOrder } from '@components/modal-profile-order';
import { ProtectedRoute } from '@components/protected-route';
import { FeedPage } from '@pages/feed-page';
import { ForgotPasswordPage } from '@pages/forgot-password-page';
import { HomePage } from '@pages/home';
import { LoginPage } from '@pages/login-page';
import { NotFoundPage } from '@pages/not-found-page';
import { ProfileMainPage } from '@pages/profile-main-page';
import { ProfileOrderPage } from '@pages/profile-order-page';
import { ProfilePage } from '@pages/profile-page';
import { RegisterPage } from '@pages/register-page';
import { ResetPasswordPage } from '@pages/reset-password-page';

import { RoutePath } from './route-paths';

export const router = createBrowserRouter([
  {
    path: RoutePath.Home,
    Component: Layout,
    children: [
      {
        path: '',
        Component: HomePage,
        children: [
          { path: `${RoutePath.Ingredients}/:id`, Component: ModalIngredients },
        ],
      },
      {
        path: RoutePath.Login,
        element: (
          <ProtectedRoute onlyUnAuth>
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePath.Register,
        element: (
          <ProtectedRoute onlyUnAuth>
            <RegisterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePath.ForgotPassword,
        element: (
          <ProtectedRoute onlyUnAuth>
            <ForgotPasswordPage />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePath.ResetPassword,
        element: (
          <ProtectedRoute onlyUnAuth>
            <ResetPasswordPage />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePath.Profile,
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            Component: ProfileMainPage,
          },
          {
            path: 'orders',
            Component: ProfileOrderPage,
            children: [{ path: ':id', Component: ModalProfileOrder }],
          },
        ],
      },
      {
        path: RoutePath.Feed,
        Component: FeedPage,
        children: [{ path: ':id', Component: ModalFeedOrder }],
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);
