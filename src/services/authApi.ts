import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './baseQueryWithReauth';
import { clearUser, setUser } from './slices/auth-slice';
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
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

type TLoginResponse = TRegisterResponse;

type TGetUserResponse = {
  success: boolean;
  user: TUser;
};

type TUpdateUserRequest = {
  name: string;
  email: string;
  password: string;
};

type TUpdateUserResponse = {
  success: boolean;
  user: TUser;
};

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

export type TUser = {
  email: string;
  name: string;
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        setTokens(data.accessToken, data.refreshToken);
        dispatch(setUser(data.user));
      },
    }),
    login: builder.mutation<TLoginResponse, TLoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        setTokens(data.accessToken, data.refreshToken);
        dispatch(setUser(data.user));
      },
    }),
    logout: builder.mutation<TLogoutResponse, TLogoutRequest>({
      query: (body) => ({
        url: '/auth/logout',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        clearTokens();
        dispatch(clearUser());
      },
    }),
    getUser: builder.query<TGetUserResponse, void>({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation<TUpdateUserResponse, TUpdateUserRequest>({
      query: (body) => ({
        url: '/auth/user',
        method: 'PATCH',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setUser(data.user));
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
  useGetUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
} = authApi;
