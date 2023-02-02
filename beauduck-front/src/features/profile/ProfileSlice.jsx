import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 회원 정보 조회 GET
export const getMemberInfo = createAsyncThunk(
  'members/getMemberInfo',
  async (id) => {
    const res = await axios.get(`/members/${id}`);
    return res.data;
  },
);

// 회원 정보 수정 patch
export const patchMemberInfo = createAsyncThunk(
  'members/patchInfoMember',
  async (patchMember) => {
    const res = await axios.patch('/members/modify');
    return res.data;
  },
);

// 회원의 최근 진행한 메이크업 목록
export const recentMakeupList = createAsyncThunk(
  'members/recentMakeupList',
  async () => {
    const res = await axios.patch(`/members/${id}`);
    return res.data;
  },
);

// 회원의 내가 만든 메이크업 목록
export const myMakeupList = createAsyncThunk(
  'members/myMakeupList',
  async () => {
    const res = await axios.patch('/members/modify');
    return res.data;
  },
);

// 회원의 갤러리
export const patchInfoMember = createAsyncThunk(
  'member/patchInfoMember',
  async () => {
    const res = await axios.patch('/members/modify');
    return res.data;
  },
);

// 회원의 갤러리 공개여부 수정
export const patchInfoMember = createAsyncThunk(
  'member/patchInfoMember',
  async () => {
    const res = await axios.patch('/members/modify');
    return res.data;
  },
);

// 회원 얼굴 정보 저장
export const patchInfoMember = createAsyncThunk(
  'member/patchInfoMember',
  async () => {
    const res = await axios.patch('/members/modify');
    return res.data;
  },
);
