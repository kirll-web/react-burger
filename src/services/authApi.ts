import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './baseQueryWithReauth';
import { clearTokens, setTokens } from './token';

type TRegisterRequest = {
  email: string;
  password: string;
  name: string;
};

type TLoginRequest = {
  email: string;
  password: string;
};

type TRegisterResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

type TLoginResponse = TRegisterResponse;

type TLogoutRequest = {
  token: string;
};

type TLogoutResponse = {
  success: boolean;
  message: string;
};

type TForgotPasswordRequest = {
  email: string;
};

type TForgotPasswordResponse = {
  success: boolean;
  message: string;
};

type TResetPasswordRequest = {
  password: string;
  token: string;
};

type TResetPasswordResponse = {
  success: boolean;
  message: string;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation<TRegisterResponse, TRegisterRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        setTokens(data.accessToken, data.refreshToken);
      },
    }),
    login: builder.mutation<TLoginResponse, TLoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        setTokens(data.accessToken, data.refreshToken);
      },
    }),
    logout: builder.mutation<TLogoutResponse, TLogoutRequest>({
      query: (body) => ({
        url: '/auth/logout',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
        clearTokens();
      },
    }),
    forgotPassword: builder.mutation<TForgotPasswordResponse, TForgotPasswordRequest>({
      query: (body) => ({
        url: '/password-reset',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<TResetPasswordResponse, TResetPasswordRequest>({
      query: (body) => ({
        url: '/password-reset/reset',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResetPasswordMutation,
} = authApi;
