import axios from 'axios';
import { getCookie } from './cookie';

const REACT_APP_MAKEUP_URL = 'https://i8b306.p.ssafy.io:8083';
const client = axios.create({
  baseURL: REACT_APP_MAKEUP_URL,
  headers: {
    'Content-type': 'application/json',
    withCredentials: true,
  },
});

// 요청 인터셉터
client.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 수행할 일
    config.headers['Authorization'] = getCookie('accessToken');
    config.headers['accessToken'] = getCookie('accessToken');
    config.headers['refreshToken'] = localStorage.getItem('refreshToken');
    return config;
  },
  (error) => {
    console.log('인터셉터', error);
    // 오류 요청을 보내기 전에 수행할 일
    return Promise.reject(error);
  },
);

// 응답 인터셉터
client.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공
    return response;
  },
  (error) => {
    // 오류 응답을 처리
    console.log(REACT_APP_MAKEUP_URL);
    console.log(error);
    return Promise.reject(error);
  },
);

export default client;
