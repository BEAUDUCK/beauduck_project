import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import memberAxios from '../../api/memberAxios';

// 회원 정보 조회 GET
export const getMemberInfo = createAsyncThunk(
  'members/getMemberInfo',
  async (memberId) => {
    const res = await memberAxios.get(`/members/${memberId}`);
    return res.data.data;
  },
);

// 회원 닉네임 중복 여부 확인 GET
export const checkNickname = createAsyncThunk(
  'members/checkNickname',
  async (nickName) => {
    const res = await memberAxios.get(`/members/check/${nickName}`);
    console.log('닉네임 중복?', res.data);
    return res.data;
  },
);

// 회원 정보 수정 PUT
export const updateMemberInfo = createAsyncThunk(
  'members/UpdateMemberInfo',
  async (payload) => {
    const res = await memberAxios.put('/members/update', payload);
    console.log('수정', res.data);
    return res.data.data;
  },
);

// 회원의 최근 진행한 메이크업 목록 GET
export const getRecentMakeupList = createAsyncThunk(
  'members/getRecentMakeupList',
  async (memberId) => {
    const res = await memberAxios.get(`/members/${memberId}/recent-makeup`);
    console.log('최근', res.data);
    return res.data;
  },
);

// 회원의 내가 만든 메이크업 목록 GET
export const getMyMakeupList = createAsyncThunk(
  'members/getMyMakeupList',
  async (memberId) => {
    const res = await memberAxios.get(`/members/${memberId}/my-makeup`);
    console.log('내가 만든 쿠키~', res.data);
    return res.data;
  },
);

// 회원의 갤러리 GET
export const getMyGalleryList = createAsyncThunk(
  'member/getMyGallery',
  async (memberId) => {
    const res = await memberAxios.get(`/members/${memberId}/gallery`);
    console.log('갤러리', res.data);
    return res.data;
  },
);

// 회원의 갤러리 공개여부 수정 PUT
// export const galleryopen = createAsyncThunk('member/galleryopen', async () => {
//   const res = await memberAxios.put('/members/gallery');
//   return res.data;
// });

// 회원 얼굴 정보 저장 POST
export const postSaveFace = createAsyncThunk(
  'member/postSaveFace',
  async (payload) => {
    console.log('페이로드', payload);
    const res = awaitaxios.post('https://i8b306.p.ssafy.io:5000/save', payload);
    console.log('얼굴', res.data);
    return res.data;
  },
);

// 내 랭킹
export const getRank = createAsyncThunk('member/getRank', async (memberId) => {
  const res = await memberAxios.get(`/rank/${memberId}`);
  console.log('랭킹', res.data);
  return res.data;
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userInfo: undefined,
    recentMakeupList: [],
    myMakeupList: [],
    myGalleryList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // 회원 정보 조회
    builder.addCase(getMemberInfo.fulfilled, (state, action) => {
      console.log(action.payload);
      state.userInfo = action.payload;
    });
    // 회원 정보 수정
    builder.addCase(updateMemberInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    // 최근 진행 메이크업 조회
    builder.addCase(getRecentMakeupList.fulfilled, (state, action) => {
      state.recentMakeupList = action.payload.data;
    });
    // 내가 만든 메이크업 조회
    builder.addCase(getMyMakeupList.fulfilled, (state, action) => {
      state.myMakeupList = action.payload.data;
    });
    // 갤러리 조회
    builder.addCase(getMyGalleryList.fulfilled, (state, action) => {
      state.myGalleryList = action.payload.data;
    });
  },
});

export const { logout } = profileSlice.actions;
export const { checkMemberId } = profileSlice.actions;

export default profileSlice.reducer;
