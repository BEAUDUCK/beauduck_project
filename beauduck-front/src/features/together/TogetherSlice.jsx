import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import client from "../../api/togetherAxios"

// 전체 투게덕 리스트 불러오기
export const getTogetherList = createAsyncThunk(
  "together/getTogether",
  async () => {
    const res = await client.get("/together");
    return res.data
  }
)

// 투게덕 방 정보 상세 조회
export const getTogetherDetail = createAsyncThunk(
  "together/getTogetherDetail",
  async (roomId) => {
    const res = await client.get(`/together/${roomId}`)
    return res.data
  }
)

// 투게덕 방 생성하기
export const postNewTogether = createAsyncThunk(
  "together/postNewTogether",
  async (newTogether) => {
    const res1 = await client.post("/together", newTogether);
    const res2 = await client.get("/together")
    return res2.data
  }
)

// 투게덕 종료
export const deleteTogetherDetail = createAsyncThunk(
  "together/deleteTogetherDetail",
  async (roomId) => {
    const res = await client.delete(`/together/${roomId}`)
    return res.data.data
  }
)

// 유저 방 입장
export const enterUser = createAsyncThunk(
  "together/enterUser",
  async (payload) => {
    const res1 = await client.post("/together/enter", payload);
    const res2 = await client.get(`/together/${payload.roomId}`)
    return res2.data
  }
)

// 유저 방 퇴장
export const outUser = createAsyncThunk(
  "together/outUser",
  async (payload) => {
    const res1 = await client.post("/together/out", payload)
    const res2 = await client.get(`/together/${payload.roomId}`)
    return res2.data
  }
)

export const TogetherSlice = createSlice({
  name: "together",
  initialState: {
    togetherList: [],
    togetherDetail: [],
    roomId: "",
    userList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTogetherList.fulfilled, (state, action) => {
        state.togetherList = action.payload
      })
      .addCase(getTogetherDetail.fulfilled, (state, action) => {
        state.togetherDetail = action.payload
        state.userList = action.payload.userList
      })
      .addCase(postNewTogether.fulfilled, (state, action) => {
        state.togetherlist = action.payload
      })
      .addCase(enterUser.fulfilled, (state, action) => {
        state.userList = action.payload.userList
      })
      .addCase(outUser.fulfilled, (state, action) => {
        state.userList = action.payload.userList
      })

  }
});

export default TogetherSlice.reducer;