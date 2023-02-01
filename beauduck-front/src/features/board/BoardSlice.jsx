import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../../api/axios';

// 한번에 게시판 리스트 조회
export const getAllList = createAsyncThunk('board/getAllList', async () => {
  const res1 = await client.get('/board/info/');
  const res2 = await client.get('/board/qa/');
  return [res1.data, res2.data];
});

// info 게시판 글 + 댓글 조회
export const getInfoBoard = createAsyncThunk(
  'board/getInfoBoard',
  async (id) => {
    const board = await client.get(`/board/info/${id}/`);
    const comment = await client.get(`/board/info/comment/${id}/`);
    return [board.data, comment.data];
  },
);

// qa 게시판 글 + 댓글 조회
export const getQaBoard = createAsyncThunk('board/getQaBoard', async (id) => {
  const board = await client.get(`/board/qa/${id}/`);
  console.log(board.data);
  // const comment = await client.get(`/board/qa/comment/${id}/`);
  // console.log(comment.data);
  // return [board.data, comment.data];
  return board.data;
});

// info 게시판 새로운 글 생성
export const newInfoBoard = createAsyncThunk(
  'board/newInfoBoard',
  async (newBoard) => {
    const res = await client.post('/board/info/', newBoard);
    return res.data;
  },
);

// qa 게시판 새로운 글 생성
export const newQaBoard = createAsyncThunk(
  'board/newQaBoard',
  async (newBoard) => {
    const res = await client.post('/board/qa/', newBoard);
    return res.data;
  },
);

// info 게시판 글 수정 ⭐
export const UpdateInfoBoard = createAsyncThunk(
  'board/UpdateInfoBoard',
  async ({ updatedBoard, id }) => {
    const res = await client.patch(`/board/info/update/${id}/`, updatedBoard);
    return res.data;
  },
);

// info 게시판 글 삭제
export const RemoveInfoBoard = createAsyncThunk(
  'board/RemoveInfoBoard',
  async (id) => {
    const res = await client.delete(`/board/info/${id}/`);
    return res.data;
  },
);

// info 게시판 새로운 댓글 생성
export const newInfoComment = createAsyncThunk(
  'board/newInfoComment',
  async (newComment) => {
    const res1 = await client.post('/board/info/comment/', newComment);
    const res2 = await client.get(`/board/info/comment/${newComment.boardId}/`);
    return res2.data;
  },
);

// info 게시판 댓글 수정 ⭐
export const updateInfoComment = createAsyncThunk(
  'board/updateInfoComment',
  async (newComment, id) => {
    const res = await client.patch(`/board/info/comment/${id}/`, newComment);
    return res.data;
  },
);

// info 게시판 댓글 삭제
export const removeInfoComment = createAsyncThunk(
  'board/removeInfoComment',
  async (id) => {
    const res = await client.delete(`/board/info/comment/${id}/`);
    const res2 = await client.get(`/board/info/comment/${id}/`);
    return res2.data;
  },
);

// qa 게시판 글 수정 ⭐
export const updateQaBoard = createAsyncThunk(
  'board/updateQaBoard',
  async (newBoard, id) => {
    const res = await client.patch(`/board/qa/${id}/`, newBoard);
    return res.data;
  },
);

// qa 게시판 글 삭제
export const removeQaBoard = createAsyncThunk(
  'board/removeQaBoard',
  async (id) => {
    const res = await client.delete(`/board/qa/${id}/`);
    return res.data;
  },
);

// qa 게시판 새로운 댓글(답변) 생성
export const newQaAnswer = createAsyncThunk(
  'board/newQaAnswer',
  async (newAnswer) => {
    const res = await client.post('/board/qa/comment/', newAnswer);
    return res.data;
  },
);

// qa 게시판 댓글(답변) 수정
export const updateQaAnswer = createAsyncThunk(
  'board/updateQaAnswer',
  async (newAnswer, id) => {
    const res = await client.patch(`/board/qa/comment/${id}/`, newAnswer);
    return res.data;
  },
);

// qa 게시판 댓글(답변) 삭제
export const removeQaAnswer = createAsyncThunk(
  'board/removeQaAnswer',
  async (id) => {
    const res = await client.delete(`/board/qa/comment/${id}/`);
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

  reducers: {
    removeComments: (state, action) => {
      state.commentList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Info, QnA 게시판 전체 게시글 한 번에 받아오기
      .addCase(getAllList.fulfilled, (state, action) => {
        state.infoList = action.payload[0];
        state.qaList = action.payload[1];
      })
      // Info 상세 (댓글 포함)
      .addCase(getInfoBoard.fulfilled, (state, action) => {
        state.nowBoard = action.payload[0];
        state.commentList = action.payload[1];
      })
      // QnA 상세 (댓글 포함)
      .addCase(getQaBoard.fulfilled, (state, action) => {
        // state.nowBoard = action.payload[0];
        // state.commentList = action.payload[1];
        state.nowBoard = action.payload;
      })
      // Info 글 수정
      .addCase(UpdateInfoBoard.fulfilled, (state, action) => {
        console.log(action.payload);
        state.nowBoard = action.payload[0];
        state.infoList = action.payload[1];
      })
      // Info 댓글 수정 (목록 갱신)
      .addCase(newInfoComment.fulfilled, (state, action) => {
        state.commentList = action.payload;
      })
      .addCase(updateInfoComment.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      // Info 댓글 삭제 (목록 갱신)
      .addCase(removeInfoComment.fulfilled, (state, action) => {
        state.commentList = action.payload;
      })
      .addCase(updateQaBoard.fulfilled, (state, action) => {
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

export const { removeComments } = boardSlice.actions;

export default boardSlice.reducer;
