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
        // navigate('/signup');
        // RegisterCheck(accessToken);
        dispatch(UserLogin(accessToken));
        console.log('로그인해');
        navigate('/');
      })

      .catch((error) => {
        console.log(error);
      });
  };

  // 등록 여부 확인
  // const RegisterCheck = async (accessToken) => {
  //   axios
  //     .get(`http://3.38.169.2:8080/naver/check?accessToken=${accessToken}`)
  //     .then((res) => {
  //       console.log('회원 여부', res.data.data);

  //       // false : 기존 회원, true: 신규 회원
  //       if (!res.data.data) {
  //         dispatch(UserLogin(accessToken));
  //         console.log('기존회원입니다.');
  //         navigate('/');
  //       } else if (res.data.data) {
  //         navigate('/signup');
  //       }
  //     });
  // };

  useEffect(() => {
    getToken();
  }, []);
};
export default NaverLogin;
