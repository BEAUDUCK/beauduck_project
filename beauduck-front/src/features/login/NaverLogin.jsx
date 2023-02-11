import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { goToLogin, signUp, signup, UserLogin } from './MemberSlice';

const NaverLogin = () => {
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get('code');
  const state = new URL(window.location.href).searchParams.get('state');
  const [cookies, setCookie, removeCookie] = useCookies(['cookie_name']);
  const navigate = useNavigate();
  const { isSignup } = useSelector((state) => state.member);

  // 토큰 발급
  const getToken = async () => {
    console.log('토큰 발급');
    axios
      .get(
        `http://i8b306.p.ssafy.io:8080/naver/callback?code=${code}&state=${state}`,
      )
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
        dispatch(UserLogin(accessToken)).then(() => {
          navigate('/');
        });

        // if (!isSignup) {
        //   console.log('로그인만 할거야야야ㅑ');
        //   dispatch(UserLogin(accessToken)).then(() => {
        //     navigate('/');
        //   });
        // } else {
        //   console.log('회원가입부터 할거야야야야ㅑ');
        //   navigate('/signup');
        // }
      })
      .catch((error) => {
        console.log('토큰 에러', error);
      });
  };

  // 로그인 실패 시 회원가입 창으로 이동
  const { loginRejected } = useSelector((state) => state.member);
  useEffect(() => {
    if (loginRejected) {
      navigate('/signup');
    }
  }, [loginRejected]);

  useEffect(() => {
    getToken();
  }, []);
};
export default NaverLogin;
