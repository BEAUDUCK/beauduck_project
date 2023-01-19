import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 전체 컨설팅 리스트 불러오기
export const axiosGetConsultingList = createAsyncThunk(
  'help/getConsulting',
  async () => {
    return axios({
      method: 'get',
      url: "",
    }).then((res) => res.data);
  }
);

// 새로운 컨설팅 추가
export const axiosPostNewConsulting = createAsyncThunk(
  'help/newConsulting',
  async (newConsulting) => {
    return axios({
      method: 'post',
      url: "",
      data: newConsulting,
    }).then((res) => res.data);
  }
);

export const consultSlice = createSlice({
  name: "consulting",
  initialState: {
    consultingList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(axiosGetConsultingList.fulfilled, (state, action) => {
      state.consultingList = action.payload;
    })
  }
});

export default consultSlice.reducer;