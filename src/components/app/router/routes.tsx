import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@components/layout';
import { ModalIngredients } from '@components/modal-ingredients';
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

export const enum RoutePath {
  Home = '/',
  Ingredients = '/ingredients',
  Login = '/login',
  Register = '/register',
  ForgotPassword = '/forgot-password',
  ResetPassword = '/reset-password',
  Profile = '/profile',
  Feed = '/feed',
  ProfileOrders = '/profile/orders',
}

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
        Component: LoginPage,
      },
      {
        path: RoutePath.Register,
        Component: RegisterPage,
      },
      {
        path: RoutePath.ForgotPassword,
        Component: ForgotPasswordPage,
      },
      {
        path: RoutePath.ResetPassword,
        Component: ResetPasswordPage,
      },
      {
        path: RoutePath.Profile,
        Component: ProfilePage,
        children: [
          {
            index: true,
            Component: ProfileMainPage,
          },
          {
            path: 'orders',
            Component: ProfileOrderPage,
          },
        ],
      },
      {
        path: RoutePath.Feed,
        Component: FeedPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);
