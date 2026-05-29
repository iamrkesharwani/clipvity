import type { IUserPublic } from '@clipvity/shared/types';
import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { checkAuth, loginUser, logoutUser, registerUser } from './authThunk';

interface AuthState {
  user: IUserPublic | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addMatcher(
        isFulfilled(registerUser, loginUser, checkAuth),
        (state, action: PayloadAction<IUserPublic>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        }
      )
      .addMatcher(
        isPending(registerUser, loginUser, logoutUser, checkAuth),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isRejected(registerUser, loginUser, logoutUser),
        (state, action) => {
          state.isLoading = false;
          state.error =
            (action.payload as string) || 'An unexpected error occurred';
        }
      );
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
