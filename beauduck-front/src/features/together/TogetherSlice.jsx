import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import client from "../../api/togetherAxios"

// 전체 투게덕 리스트 불러오기
export const getTogetherList = createAsyncThunk(
  "together/getTogether",
  async () => {
    const res = await client.get("/together");
    return res.data.data
  }
)

// 투게덕 방 정보 상세 조회
export const getTogetherDetail = createAsyncThunk(
  "together/getTogetherDetail",
  async (roomId) => {
    const res = await client.post(`/together/${roomId}`)
    return res.data.data
  }
)

// 투게덕 방 생성하기
export const postNewTogether = createAsyncThunk(
  "together/postNewTogether",
  async (newTogether) => {
    const res1 = await client.post("/together", newTogether);
    const res2 = await client.get("/together")
    return [res1.data.data, res2.data.data]
  }
)

export const TogetherSlice = createSlice({
  name: "together",
  initialState: {
    togetherlist: [],
    togetherDetail: [],
    userList: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTogetherList.fulfilled, (state, action) => {
        state.togetherlist = action.payload
      })
      .addCase(getTogetherDetail.fulfilled, (state, action) => {
        state.togetherDetail = action.payload
        state.userList = action.payload.userList
      })
      .addCase(postNewTogether.fulfilled, (state, action) => {

      })
  }
});

export default TogetherSlice.reducer;