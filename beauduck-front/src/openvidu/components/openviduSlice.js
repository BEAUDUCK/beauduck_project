import { createSlice } from "@reduxjs/toolkit";

export const openviduSlice = createSlice({
  name: "openvidu",
  initialState: {
    stageResult: null,
    totalResult: null
  },
  reducers: {
    totalResultSave: (state, action) => {
      state.totalResult = action.payload
    },
    stageResultSave: (state, action) => {
      state.stageResult = action.payload
    }
  },
  extraReducers: (builder) => {

  },
})

const { actions, reducer } = openviduSlice

export const { totalResultIncrement } = actions

export default openviduSlice.reducer;