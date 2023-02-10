import axios from 'axios';
import { getCookie } from './cookie';
import { useCookies } from 'react-cookie';

const REACT_APP_BOARD_URL = 'https://i8b306.p.ssafy.io:8081/api';
const client = axios.create({
  baseURL: REACT_APP_BOARD_URL,
  headers: {
    'Content-type': 'application/json',
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
  async (error) => {
    console.log('axios 에러', error);
    // 오류 응답을 처리
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 401 && !originalRequest._retry) {
      console.log('토큰 만료');
      originalRequest._retry = true;

      const server = 'https://i8b306.p.ssafy.io:8080/';
      const [cookies, setCookie, removeCookie] = useCookies(['cookie_name']);
      const refreshToken = localStorage.getItem('refreshToken');
      const res = await axios.get(
        `${server}refresh?refreshToken=${refreshToken}`,
      );
      setCookie(res.data.data.accessToken);
    }
    console.log(REACT_APP_BOARD_URL);
    console.log(error);

    return Promise.reject(error);
  },
);

export default client;
