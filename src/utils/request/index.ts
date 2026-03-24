import axios, { isAxiosError, isCancel } from 'axios';

import { REQUEST_TIMEOUT } from './consts';
import {
  buildApiErrorMessage,
  buildErrorMessage,
  buildResponseError,
  buildResponseSuccess,
} from './responseBuilder';
import { ApiCode, CommonErrorType, ResponseType } from './types';

import type { ApiResponse, ApiResponseError } from './types';

const api = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function getRequest<T>(
  url: string,
  params?: Record<string, string | number | undefined | null>,
  headers?: Record<string, string | number | undefined>,
  signal?: AbortSignal
): Promise<T | undefined> {
  const response = await api.get<T>(url, {
    ...(headers && { headers: { ...headers } }),
    timeout: REQUEST_TIMEOUT,
    params,
    signal,
  });
  return response.data;
}

async function postRequest<T, D = unknown>(
  url: string,
  data: D,
  headers?: Record<string, string | number | undefined>,
  signal?: AbortSignal
): Promise<T | undefined> {
  const response = await api.post<T>(url, data, {
    ...(headers && { headers: { ...headers } }),
    signal,
  });
  return response.data;
}

async function putRequest<T, D = unknown>(
  url: string,
  data: D,
  headers?: Record<string, string | number | undefined>,
  signal?: AbortSignal
): Promise<T | undefined> {
  const response = await api.put<T>(url, data, {
    ...(headers && { headers: { ...headers } }),
    signal,
  });
  return response.data;
}

async function deleteRequest<T>(
  url: string,
  headers?: Record<string, string | number | undefined>,
  signal?: AbortSignal
): Promise<T | undefined> {
  const response = await api.delete<T>(url, {
    ...(headers && { headers: { ...headers } }),
    signal,
  });
  return response.data;
}

function encodeBase64(input: string): string {
  const utf8Bytes = new TextEncoder().encode(input);
  let binary = '';
  utf8Bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function handleError(
  error: unknown,
  fallbackError = CommonErrorType.UnknownError
): ApiResponseError<CommonErrorType> {
  if (isCancel(error)) {
    return buildResponseError(CommonErrorType.Cancelled);
  }

  if (isAxiosError(error)) {
    if (!error.response) {
      return buildResponseError(fallbackError);
    }

    const { status } = error.response;
    const responseData = error.response.data as
      | {
          code?: string;
          message?: string;
          title?: string;
          errors?: Record<string, string[]>;
        }
      | undefined;

    if (status >= Number(ApiCode.ServerError)) {
      return buildResponseError(
        CommonErrorType.ServerError,
        undefined,
        status,
        CommonErrorType.ServerError,
        responseData
      );
    }

    return buildResponseError(
      CommonErrorType.UnknownError,
      undefined,
      status,
      CommonErrorType.UnknownError,
      responseData
    );
  }

  return buildResponseError(fallbackError);
}

export const executeRequest = async <T>(
  request: () => Promise<T | undefined>
): Promise<ApiResponse<T>> => {
  try {
    const data = await request();

    if (!data) {
      return buildResponseError(CommonErrorType.UnknownError);
    }

    return buildResponseSuccess(data);
  } catch (error) {
    return handleError(error);
  }
};

export const Api = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  handleError,
  responseTypes: ResponseType,
  codes: ApiCode,
  buildResponseSuccess,
  buildResponseError,
  encodeBase64,
  buildApiErrorMessage,
  buildErrorMessage,
  executeRequest,
};

export { CommonErrorType, ResponseType } from './types';
export type { ApiResponse, ErrorType } from './types';
