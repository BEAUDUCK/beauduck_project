import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMemberId, UserLogin } from './MemberSlice';

const NaverLogin = () => {
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get('code');
  const state = new URL(window.location.href).searchParams.get('state');
  const [cookies, setCookie, removeCookie] = useCookies(['cookie_name']);

  const navigate = useNavigate();
  const nickName = useSelector((state) => state.member);
  console.log(code, state);
  // 토큰 발급
  const getToken = async () => {
    axios
      .get(`http://3.38.169.2:8080/naver/callback?code=${code}&state=${state}`)
      .then((res) => {
        localStorage.setItem('refreshToken', res.data.data.refreshToken);
        const accessToken = res.data.data.accessToken;
        const expireDate = new Date();
        expireDate.setMinutes(expireDate.getMinutes() + 20);
        setCookie(
          'accessToken',
          { accessToken },
          {
            path: '/',
            expires: expireDate,
          },
        );
        alert('인증 완료');
        console.log('토큰 발급함~');
        dispatch(UserLogin(accessToken));
        console.log('로그인해');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getToken();
  }, []);
};
export default NaverLogin;
