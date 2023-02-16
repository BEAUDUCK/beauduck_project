import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { async } from 'q';
import client from '../../api/consultAxios';

// 전체 컨설팅 리스트 불러오기
export const getConsultingList = createAsyncThunk(
  'help/getConsulting',
  async () => {
    const res = await client.get('/consult/');
    return res.data.data;
  },
);

// 새로운 컨설팅 추가
export const postNewConsulting = createAsyncThunk(
  'help/newConsulting',
  async (newConsulting) => {
    const res1 = await client.post('/consult/', newConsulting);
    const res2 = await client.get('/consult/');
    return [res1.data.data, res2.data.data];
  },
);

// 방 파괴
export const deleteConsultingRoom = createAsyncThunk(
  'help/deleteConsultingRoom',
  async (roomId) => {
    await client.delete(`/consult/${roomId}/`);
  },
);

// 방 상세조회 (대기열)
export const getConsultDetail = createAsyncThunk(
  'help/getConsultDetail',
  async (roomId) => {
    const res = await client.get(`/consult/${roomId}/`);
    return res.data.data;
  },
);

// 유저 방 입장 -> 방 상세 갱신
export const enterUser = createAsyncThunk('help/enterUser', async (payload) => {
  const check = await client.post('/consult/enter/', payload);
  console.log('check', check.data);
  const res = await client.get(`/consult/${payload.roomId}`);
  return res.data;
});

// 유저 방 퇴장 -> 방 상세 갱신
export const outUser = createAsyncThunk('help/outUser', async (payload) => {
  const check = await client.post('/consult/out/', payload);
  const res = await client.get(`/consult/${payload.roomId}`);
  return res.data;
});

// 뉴스 크롤링
export const getMakeupInfo = createAsyncThunk('help/getNews', async () => {
  const res1 = await client.get('/naver/news');
  const res2 = await client.get('/naver/blog');
  const res3 = await client.get('/naver/shop/?keyword=makeup');
  return [res1.data, res2.data, res3.data];
});

export const consultSlice = createSlice({
  name: 'consulting',
  initialState: {
    consultingList: [],
    consultDetail: [],
    roomId: '',
    userList: [],
    isActive: false,
    isHost: false,
    // 집중s
    isExercising: 'start',
    isFinished: undefined,
    myResult: [],
    allResult: [],
    // 결과
    maxIdx: -1,

    // 뉴스 크롤링
    infoNews: [],
    infoBlog: [],
    infoShop: [],
  },
  reducers: {
    checkIsHost: (state, action) => {
      state.isHost = true;
      state.userCount = state.userList.length;
    },
    loadingOut: (state, action) => {
      state.isActive = false;
    },
    // 집중 참고
    setExerciseStatus: (state, action) => {
      state.isExercising = action.payload;
    },
    setFinishStatus: (state, action) => {
      state.isFinished = action.payload;
    },
    setMyExerciseResult: (state, action) => {
      const beforeResult = [...state.myResult];
      const newResult = [...action.payload];
      state.myResult = beforeResult.concat(newResult);
      console.log('저장해쒀', state.myResult);
    },
    setAllExerciseResult: (state, action) => {
      const results = action.payload;
      console.log('저장하러 왔어 results', results);
      for (let i = 0; i < results.length; i++) {
        console.log(
          i,
          'results[i].personalResults',
          results[i].personalResults,
        );
        state.allResult.push(results[i].personalResults);
      }
      console.log('잘들어왔슴니다', state.allResult);

      // 여기서부터 결과 내는 알고리즘
      const finalResult = state.allResult;
      const userCount = finalResult.length;
      const finalCount = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0,
      ];
      for (let i = 0; i < userCount; i++) {
        for (let j = 0; j < finalResult[i].length; j++) {
          finalCount[finalResult[i][j] - 1]++;
        }
      }
      console.log(finalCount); // 50개 배열

      const resultHalf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const resultCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      finalCount.map((cnt, idx) => {
        if (cnt >= Math.round(userCount / 2)) {
          resultHalf[idx % 10]++;
        }
      });
      console.log('resultHalf', resultHalf);
      console.log(resultHalf);
      const maxVal = Math.max(...resultHalf);
      console.log('첫번째 maxVal', maxVal);
      const maxCnt = resultHalf.filter((cnt) => cnt === maxVal).length;
      if (maxCnt === 1) {
        state.maxIdx = resultHalf.indexOf(maxVal);
        console.log('완료', state.maxIdx);
      } else {
        // 과반으로 했을 때 퍼컬이 두개 이상
        finalCount.map((cnt, idx) => {
          resultCount[idx % 10] += cnt;
        });
        console.log('resultCount', resultCount);
        const maxVal = Math.max(...resultCount);
        console.log('두번째 maxVal', maxVal);
        state.maxIdx = resultCount.indexOf(maxVal);
        console.log('여기서 완료', state.maxIdx);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConsultingList.fulfilled, (state, action) => {
        state.consultingList = action.payload;
      })
      .addCase(postNewConsulting.fulfilled, (state, action) => {
        state.roomId = action.payload[0].roomId;
        state.consultingList = action.payload[1];
        state.isActive = true;
        state.isHost = true;
        state.myResult = [];
        state.allResult = [];
        state.isExercising = 'start';
      })
      .addCase(getConsultDetail.fulfilled, (state, action) => {
        state.consultDetail = action.payload;
        state.userList = action.payload.userList;
      })
      .addCase(enterUser.fulfilled, (state, action) => {
        state.consultDetail = action.payload.data;
        state.userList = action.payload.data.userList;
        state.isHost = false;
        state.myResult = [];
        state.allResult = [];
        state.isExercising = 'start';
      })
      .addCase(outUser.fulfilled, (state, action) => {
        state.consultDetail = action.payload.data;
        state.userList = action.payload.data.userList;
      })
      .addCase(getMakeupInfo.fulfilled, (state, action) => {
        state.infoNews = action.payload[0].items;
        state.infoBlog = action.payload[1].items;
        state.infoShop = action.payload[2].items;
      });
  },
});

export default consultSlice.reducer;
export const {
  checkIsHost,
  loadingOut,
  setExerciseStatus,
  setFinishStatus,
  setMyExerciseResult,
  setAllExerciseResult,
} = consultSlice.actions;
