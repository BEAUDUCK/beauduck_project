import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  accessToken: '',
  refreshToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { setAuth } = authSlice.actions;

export const naverLogin = (code, state) => async (dispatch) => {
  try {
    const response = await axios.get(`http://3.38.169.2:8080/naver/callback?code={code}&state=STRING_STATE`, 
    {
      params: {
        code
      }
    });

    dispatch(setAuth({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    }));
  } catch (error) {
    console.error(error);
  }
};

export default authSlice.reducer;