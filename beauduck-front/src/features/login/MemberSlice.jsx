import { createSlice } from '@reduxjs/toolkit';

export const memberSlice = createSlice({
  name: 'member',
  initialState: {
    memberId: '',
    name: '',
    nickName: '',
  },
  reducers: {
    getMemberId: (state, action) => {
      state.memberId = action.payload.memberId;
      state.name = action.payload.name;
    },
    getNickName: (state, action) => {
      state.nickName = action.payload.nickName;
    }
  },
  extraReducers: (builder) => {},
});

export const { getMemberId, getNickName } = memberSlice.actions;
export default memberSlice.reducer;
