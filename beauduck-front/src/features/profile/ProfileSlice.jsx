import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 회원 정보 조회 GET
export const getInfoMember = createAsyncThunk(
  'member/getInfoMember',
  async () => {
    const res = await axios.get(`/members/${id}`);
    return res.data;
  },
);

// 회원 정보 수정 patch
export const patchInfoMember = createAsyncThunk(
  'member/patchInfoMember',
  async () => {
    const res = await axios.patch('/members/modify');
    return res.data;
  },
);