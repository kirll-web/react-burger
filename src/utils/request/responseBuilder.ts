import { ApiCode, ResponseType } from './types';

import type { ApiResponse, ApiResponseError, CommonErrorType, ErrorType } from './types';

export const buildResponseSuccess = <T>(data: T): ApiResponse<T> => {
  return { type: ResponseType.Success, data };
};

export const buildResponseError = <T extends string = CommonErrorType>(
  errorType: ErrorType<T>,
  message = '',
  code: number = ApiCode.UnknownError,
  cause?: T,
  details?: unknown
): ApiResponseError<T> => {
  return { type: ResponseType.Error, errorType, message, code, cause, details };
};

export const buildApiErrorMessage = (
  title: string,
  apiError?: ApiResponseError
): string => {
  return `${title}. ErrorType: ${apiError?.errorType}, code: ${apiError?.code}, message: ${apiError?.message},  cause: ${apiError?.cause}`;
};

export const buildErrorMessage = (title: string, error?: Error): string => {
  return `${title}. Name:  ${error?.name}, Message: ${error?.message}, cause: ${String(error?.cause)}, stack: ${error?.stack}`;
};
