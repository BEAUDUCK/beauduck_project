import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../../api/boardAxios';

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

// info 게시판 새로운 글 생성
export const newInfoBoard = createAsyncThunk(
  'board/newInfoBoard',
  async (newBoard) => {
    console.log('here');
    const res = await client.post('/board/info/', newBoard);
    console.log('here', res.data);
    return res.data;
  },
);

// info 게시판 글 수정
export const UpdateInfoBoard = createAsyncThunk(
  'board/UpdateInfoBoard',
  async (payload) => {
    await client.put(
      `/board/info/update/${payload.boardId}/`,
      payload.updatedBoard,
    );
    const res = await client.get(`/board/info/${payload.boardId}/`);
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
    await client.post('/board/info/comment/', newComment);
    const res = await client.get(
      `/board/info/comment/${newComment.boardInfoEntity.id}/`,
    );
    return res.data;
  },
);

// info 게시판 댓글 수정
export const updateInfoComment = createAsyncThunk(
  'board/updateInfoComment',
  async (payload) => {
    await client.put(
      `/board/info/comment/${payload.commentId}/`,
      payload.updatedComment,
    );
    const res = await client.get(
      `/board/info/comment/${payload.updatedComment.boardInfoEntity.id}/`,
    );
    return res.data;
  },
);

// info 게시판 댓글 삭제
export const removeInfoComment = createAsyncThunk(
  'board/removeInfoComment',
  async (payload) => {
    await client.delete(`/board/info/comment/${payload.commentId}/`);
    const res = await client.get(`/board/info/comment/${payload.boardId}/`);
    return res.data;
  },
);

// qa 게시판 글 + 댓글 조회
export const getQaBoard = createAsyncThunk('board/getQaBoard', async (id) => {
  const board = await client.get(`/board/qa/${id}/`);
  const comment = await client.get(`/board/qa/comment/${id}/`);
  return [board.data, comment.data];
});

// qa 게시판 새로운 글 생성
export const newQaBoard = createAsyncThunk(
  'board/newQaBoard',
  async (newBoard) => {
    const res = await client.post('/board/qa/', newBoard);
    return res.data;
  },
);

// qa 게시판 글 수정
export const updateQaBoard = createAsyncThunk(
  'board/updateQaBoard',
  async (payload) => {
    await client.put(`/board/qa/${payload.boardId}/`, payload.updatedBoard);
    const res = await client.get(`/board/qa/${payload.boardId}/`);
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
    await client.post('/board/qa/comment/', newAnswer);
    const res = await client.get(
      `/board/qa/comment/${newAnswer.boardQaEntity.id}/`,
    );
    return res.data;
  },
);

// qa 게시판 댓글(답변) 수정 ⭐
export const updateQaAnswer = createAsyncThunk(
  'board/updateQaAnswer',
  async (payload) => {
    await client.put(
      `/board/qa/comment/${payload.answerId}/`,
      payload.updatedAnswer,
    );
    const res = await client.get(
      `/board/qa/comment/${payload.updatedAnswer.boardQaEntity.id}/`,
    );
    return res.data;
  },
);

// qa 게시판 댓글(답변) 삭제
export const removeQaAnswer = createAsyncThunk(
  'board/removeQaAnswer',
  async (payload) => {
    await client.delete(`/board/qa/comment/${payload.answerId}/`);
    const res = await client.get(`/board/qa/comment/${payload.boardId}/`);
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
        state.nowBoard = action.payload[0];
        state.commentList = action.payload[1];
      })
      // Info 글 수정
      .addCase(UpdateInfoBoard.fulfilled, (state, action) => {
        state.nowBoard = action.payload;
      })
      // Info 댓글 생성 (목록 갱신)
      .addCase(newInfoComment.fulfilled, (state, action) => {
        state.commentList = action.payload;
      })
      // QnA 답변 생성 (목록 갱신)
      .addCase(newQaAnswer.fulfilled, (state, action) => {
        state.commentList = action.payload;
      })
      // Info 댓글 수정 (목록 갱신)
      .addCase(updateInfoComment.fulfilled, (state, action) => {
        state.commentList = action.payload;
      })
      // Info 댓글 삭제 (목록 갱신)
      .addCase(removeInfoComment.fulfilled, (state, action) => {
        state.commentList = action.payload;
      })
      .addCase(updateQaBoard.fulfilled, (state, action) => {
        state.nowBoard = action.payload;
      })
      .addCase(updateQaAnswer.fulfilled, (state, action) => {
        state.commentList = action.payload;
      })
      .addCase(removeQaAnswer.fulfilled, (state, action) => {
        state.commentList = action.payload;
      });
  },
});

export const { removeComments } = boardSlice.actions;

export default boardSlice.reducer;
