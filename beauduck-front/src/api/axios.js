import axios from 'axios';
import { useCookies } from 'react-cookie';
// const getCookie = (cookie_name) => {
//   const val = document.cookie.split(';');
//   for (let i = 0; i < val.length; i++) {
//     let x = val[i].substr(0, val[i].indexOf('='));
//     const y = val[i].substr(val[i].indexOf('=') + 1);
//     x = x.replace(/^\s+|\s+$/g, '');
//     if (x === cookie_name) {
//       return unescape(y);
//     }
//   }
// };

// const getAccessToken = () => {
//   const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
//   const accessToken = cookies.accessToken;
//   return accessToken;
// };

const REACT_APP_BASE_URL = 'http://3.38.169.2:8081';
const client = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

// 요청 인터셉터
client.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 수행할 일
    // console.log(cookies.accessToken);
    // config.headers['accessToken'] = getCookie('accessToken');
    config.headers['refreshToken'] = localStorage.getItem('refreshToken');
    console.log('config', config);
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
  (error) => {
    // 오류 응답을 처리
    console.log(REACT_APP_BASE_URL);
    console.log(error);
    return Promise.reject(error);
  },
);

export default client;
