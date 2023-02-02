import { createSlice } from '@reduxjs/toolkit';

export const memberSlice = createSlice({
  name: 'member',
  initialState: {
    memberId: '',
    name: '',
  },
  reducers: {
    getMemberId: (state, action) => {
      state.memberId = action.payload.memberId;
      state.name = action.payload.name;
    },
  },
  extraReducers: (builder) => {},
});

export const { getMemberId } = memberSlice.actions;
export default memberSlice.reducer;
