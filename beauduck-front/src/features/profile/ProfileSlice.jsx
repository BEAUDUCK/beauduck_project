import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../../api/aixos2';




// 회원 정보 조회 GET
export const getMemberInfo = createAsyncThunk(
  'members/getMemberInfo',
  async (memberid) => {
    const res = await client.get(`/members/${memberid}`);
    return res.data;
  },
);

// 회원 정보 수정 put
export const UpdateMemberInfo = createAsyncThunk(
  'members/UpdateMemberInfo',
  async () => {
    const res = await client.put('/members/update');
    return res.data;
  },
);

// 회원 닉네임 중복 여부 확인
// export const checkNickname  = createAsyncThunk(
//   'members/checkNickname',
//   async (nickName) => {
//     const res = await client.get(`/members/${nickName}`);
//     return res.data;
//   },
// );


// 회원의 최근 진행한 메이크업 목록 get
export const recentMakeupList = createAsyncThunk(
  'members/recentMakeupList',
  async (memberid) => {
    const res = await client.get(`/members/${memberid}/recent-makeup`);
    return res.data;
  },
);

// 회원의 내가 만든 메이크업 목록 get
export const myMakeupList = createAsyncThunk(
  'members/myMakeupList',
  async () => {
    const res = await client.get('/members/${memberid}/my-makeup');
    return res.data;
  },
);

// 회원의 갤러리 get
export const gallery = createAsyncThunk(
  'member/gallery',
  async () => {
    const res = await client.get('/members/{memberId}/gallery');
    return res.data;
  },
);

// 회원의 갤러리 공개여부 수정 put
export const galleryopen = createAsyncThunk(
  'member/galleryopen',
  async () => {
    const res = await client.put('/members/gallery');
    return res.data;
  },
);
// 회원 얼굴 정보 저장은 미정

export const profileSlice = createSlice({
  name: 'member',
  initialState: {
    memberId: null,
    memberNickname: null,
  },
  reducers: {
    //로그아웃
    logout: (state, action) => {
      localStorage.clear()
  },
  // 멤버 아이디 받기
  checkMemberId: (state, action) => {
    state.memberId = Number(action.payload)
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMemberInfo.fulfilled, (state, action) => {
        state.getMemberInfo = action.payload;
      })
      .addCase(UpdateMemberInfo.fulfilled, (state, action) => {
        state.getMemberInfo = action.payload;
      })
      .addCase(recentMakeupList.fulfilled, (state, action) => {
        state.getMemberInfo = action.payload;
      })
      .addCase(myMakeupList.fulfilled, (state, action) => {
        state.getMemberInfo = action.payload;
      })
      .addCase(gallery.fulfilled, (state, action) => {
        state.getMemberInfo = action.payload;
      })
      .addCase(galleryopen.fulfilled, (state, action) => {
        state.getMemberInfo = action.payload;
      })
      
  },
})

export const { logout } = profileSlice.actions;
export const { checkMemberId } = profileSlice.actions;

export default profileSlice.reducer;