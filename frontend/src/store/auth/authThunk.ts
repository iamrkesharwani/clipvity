import { createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errors/extractError';
import type { IUserPublic } from '@clipvity/shared/types';
import type { LoginInput, RegisterInput } from '@clipvity/shared/schema/auth';
import { apiClient } from '../../api/client';

export const registerUser = createAsyncThunk<
  IUserPublic,
  RegisterInput,
  { rejectValue: string }
>('auth/register', async (credentials, thunkAPI) => {
  try {
    const response = await apiClient.post('/auth/register', credentials);
    return response.data.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

export const loginUser = createAsyncThunk<
  IUserPublic,
  LoginInput,
  { rejectValue: string }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const checkAuth = createAsyncThunk<
  IUserPublic,
  void,
  { rejectValue: string }
>('auth/checkAuth', async (_, thunkAPI) => {
  try {
    const response = await apiClient.get('/auth/me');
    return response.data.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue;
  }
});
