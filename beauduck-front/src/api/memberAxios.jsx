import axios from 'axios';
import { getCookie } from './cookie';

const REACT_APP_BASE_URL = 'https://i8b306.p.ssafy.io:8080';

const member = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

// 요청 인터셉터
member.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 수행할 일
    config.headers['Authorization'] = getCookie('accessToken');
    config.headers['accessToken'] = getCookie('accessToken');
    config.headers['refreshToken'] = localStorage.getItem('refreshToken');
    return config;
  },
  (error) => {
    // 오류 요청을 보내기 전에 수행할 일
    return Promise.reject(error);
  },
);

// 응답 인터셉터
member.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공
    return response;
  },
  (error) => {
    // 오류 응답을 처리
    console.log(REACT_APP_BASE_URL);
    console.log(error);
    return Promise.reject(error);
  },
);

export default member;
