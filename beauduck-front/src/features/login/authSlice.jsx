import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  accessToken: '',
  refreshToken: '',
  isFirstLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isFirstLogin = action.payload.isFirstLogin;
    },
  },
});

export const { setAuth } = authSlice.actions;

export const naverLogin = (code, state) => async (dispatch) => {
  try {
    const response = await axios.get(`http://3.38.169.2:8080/naver/callback`, {
      params: {
        code,
        state,
      },
    });

    dispatch(setAuth({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      isFirstLogin: response.data.isFirstLogin,
    }));
  } catch (error) {
    console.error(error);
  }
};

export default authSlice.reducer;