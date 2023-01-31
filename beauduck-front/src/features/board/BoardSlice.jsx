import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// info 게시판 리스트 조회
export const getInfoList = createAsyncThunk('board/getInfoList', async () => {
  const res = await axios.get('/board/info');
  return res.data;
});

// info 게시판 글 조회
export const getInfoBoard = createAsyncThunk(
  'board/getInfoBoard',
  async (id) => {
    const res = await axios.get(`/board/info/${id}`);
    return res.data;
  },
);

// info 게시판 댓글 목록 조회
export const getInfoComments = createAsyncThunk(
  'board/getInfoComments',
  async (id) => {
    const res = await axios.get(`/board/info/comment/${id}`);
    return res.data;
  },
);

// info 게시판 새로운 글 생성
export const newInfoBoard = createAsyncThunk(
  'board/newInfoBoard',
  async (newBoard) => {
    const res = await axios.post('/board/info', newBoard);
    return res.data;
  },
);

// info 게시판 글 수정
export const UpdateInfoBoard = createAsyncThunk(
  'board/UpdateInfoBoard',
  async (updatedBoard, id) => {
    const res = await axios.patch(`/board/info/${id}`, updatedBoard);
    return res.data;
  },
);

// info 게시판 글 삭제
export const RemoveInfoBoard = createAsyncThunk(
  'board/RemoveInfoBoard',
  async (id) => {
    const res = await axios.delete(`/board/info/${id}`);
    return res.data;
  },
);

// info 게시판 새로운 댓글 생성
export const newInfoComment = createAsyncThunk(
  'board/newInfoComment',
  async (newComment) => {
    const res = await axios.post('board/info/comment', newComment);
    return res.data;
  },
);

// info 게시판 댓글 수정
export const updateInfoComment = createAsyncThunk(
  'board/updateInfoComment',
  async (newComment, id) => {
    const res = await axios.patch(`board/info/comment/${id}`, newComment);
    return res.data;
  },
);

// info 게시판 댓글 삭제
export const removeInfoComment = createAsyncThunk(
  'board/removeInfoComment',
  async (id) => {
    const res = await axios.delete(`board/info/comment/${id}`);
    return res.data;
  },
);

// qa 게시판 리스트 조회
export const getQaList = createAsyncThunk('board/getQaList', async () => {
  const res = await axios.get('/board/qa');
  return res.data;
});

// qa 게시판 글 조회
export const getQaBoard = createAsyncThunk('board/getQaBoard', async (id) => {
  const res = await axios.get(`/board/qa/${id}`);
  return res.data;
});

// qa 게시판 댓글 목록 조회
export const getQaComments = createAsyncThunk(
  'board/getQaComments',
  async (id) => {
    const res = await axios.get(`/board/qa/comment/${id}`);
    return res.data;
  },
);

// qa 게시판 새로운 글 생성
export const newQaBoard = createAsyncThunk(
  'board/newQaBoard',
  async (newBoard) => {
    const res = await axios.post('/board/qa', newBoard);
    return res.data;
  },
);

// qa 게시판 글 수정
export const updateQaBoard = createAsyncThunk(
  'board/updateQaBoard',
  async (newBoard, id) => {
    const res = await axios.patch(`/board/qa/${id}`, newBoard);
    return res.data;
  },
);

// qa 게시판 글 수정
export const removeQaBoard = createAsyncThunk(
  'board/removeQaBoard',
  async (id) => {
    const res = await axios.delete(`/board/qa/${id}`);
    return res.data;
  },
);

// qa 게시판 새로운 댓글(답변) 생성
export const newQaAnswer = createAsyncThunk(
  'board/newQaAnswer',
  async (newAnswer) => {
    const res = await axios.post('/board/qa/comment', newAnswer);
    return res.data;
  },
);

// qa 게시판 댓글(답변) 수정
export const updateQaAnswer = createAsyncThunk(
  'board/updateQaAnswer',
  async (newAnswer, id) => {
    const res = await axios.patch(`/board/qa/comment/${id}`, newAnswer);
    return res.data;
  },
);

// qa 게시판 댓글(답변) 삭제
export const removeQaAnswer = createAsyncThunk(
  'board/removeQaAnswer',
  async (id) => {
    const res = await axios.delete(`/board/qa/comment/${id}`);
    return res.data;
  },
);

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    infoList: [],
    qaList: [],
    nowBoard: '',
    commentList: [],
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInfoList.fulfilled, (state, action) => {
        state.infoList = action.payload;
      })
      .addCase(getQaList.fulfilled, (state, action) => {
        state.qaList = action.payload;
      })
      .addCase(getInfoBoard.fulfilled, (state, action) => {
        state.nowBoard = action.payload;
      })
      .addCase(getQaBoard.fulfilled, (state, action) => {
        state.nowBoard = action.payload;
      })
      .addCase(getInfoComments.fulfilled, (state, action) => {
        state.commentList = action.payload;
      })
      .addCase(newInfoBoard.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(newQaBoard.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(newInfoComment.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(newQaAnswer.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(UpdateInfoBoard.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(RemoveInfoBoard.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(updateInfoComment.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(removeInfoComment.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(updateQaBoard.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(removeQaBoard.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(updateQaAnswer.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(removeQaAnswer.fulfilled, (state, action) => {
        console.log(action.payload);
      });
  },
});

export default boardSlice.reducer;
