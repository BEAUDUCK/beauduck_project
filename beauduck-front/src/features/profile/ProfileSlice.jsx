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
// export const checkNickname  = createAsyncThunk(
//   'members/checkNickname',
//   async (nickName) => {
//     const res = await memberAxios.get(`/members/${nickName}`);
//     return res.data;
//   },
// );

// 회원 정보 수정 PUT
export const updateMemberInfo = createAsyncThunk(
  'members/UpdateMemberInfo',
  async (payload) => {
    const res = await memberAxios.put('/members/update', payload.updatedInfo);
    return res.data;
  },
);

// 회원의 최근 진행한 메이크업 목록 GET
export const getRecentMakeupList = createAsyncThunk(
  'members/getRecentMakeupList',
  async (memberId) => {
    const res = await memberAxios.get(`/members/${memberId}/recent-makeup`);
    return res.data;
  },
);

// 회원의 내가 만든 메이크업 목록 GET
export const getMyMakeupList = createAsyncThunk(
  'members/getMyMakeupList',
  async (memberId) => {
    const res = await memberAxios.get(`/members/${memberId}/my-makeup`);
    return res.data;
  },
);

// 회원의 갤러리 GET
export const getMyGalleryList = createAsyncThunk(
  'member/getMyGallery',
  async (memberId) => {
    const res = await memberAxios.get(`/members/${memberId}/gallery`);
    return res.data;
  },
);

// 회원의 갤러리 공개여부 수정 PUT
export const galleryopen = createAsyncThunk(
  'member/galleryopen',
  async () => {
    const res = await memberAxios.put('/members/gallery');
    return res.data;
  },
);

// 회원 얼굴 정보 저장 POST
export const postSaveFace = createAsyncThunk(
  'member/postSaveFace',
  async (payload) => {
    const res = await memberAxios.post('/members/ai', payload)
    return res.data
  }
)
// 회원 얼굴 정보 저장은 미정

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userInfo: undefined,
    recentMakeupList: [],
    myMakeupList: [],
    myGalleryList: [],
  },
  reducers: {

  },
  extraReducers: (builder) => {
    // 회원 정보 조회 
    builder.addCase(getMemberInfo.fulfilled,(state, action) => {
      state.userInfo = action.payload
    })
    // 회원 정보 수정
    // builder.addCase(updateMemberInfo.fulfilled, (state, action) => {
    //   state.userInfo = action.payload
    // })
    // 최근 진행 메이크업 조회
    builder.addCase(getRecentMakeupList.fulfilled, (state, action) => {
      state.recentMakeupList = action.payload
    })
    // 내가 만든 메이크업 조회
    builder.addCase(getMyMakeupList.fulfilled, (state, action) => {
      state.myMakeupList = action.payload
    })
    builder.addCase(getMyGalleryList.fulfilled, (state, action) => {
      state.myGalleryList = action.payload
    })
  },
})

export const { logout } = profileSlice.actions;
export const { checkMemberId } = profileSlice.actions;

export default profileSlice.reducer;