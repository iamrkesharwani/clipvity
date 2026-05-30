import axios from 'axios';

export const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (error.response?.data?.message as string) ?? error.message;
  }
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
};
