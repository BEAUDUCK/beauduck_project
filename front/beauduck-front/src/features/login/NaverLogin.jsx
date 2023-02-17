import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin } from './MemberSlice';

const NaverLogin = () => {
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get('code');
  const state = new URL(window.location.href).searchParams.get('state');
  const [cookies, setCookie, removeCookie] = useCookies(['cookie_name']);
  const navigate = useNavigate();
  useEffect(() => {
    getToken();
  }, []);
  
  const { loginRejected } = useSelector((state) => state.member);
  // 토큰 발급
  const getToken = async () => {
    axios
    .get(
      `https://i8b306.p.ssafy.io:8080/naver/callback?code=${code}&state=${state}`,
      )
      .then((res) => {
        localStorage.setItem('refreshToken', res.data.data.refreshToken);
        const accessToken = res.data.data.accessToken;
        const expireDate = new Date();
        expireDate.setMinutes(expireDate.getMinutes() + 30);
        setCookie(
          'accessToken',
          { accessToken },
          {
            path: '/',
            expires: expireDate,
          },
          );
          dispatch(UserLogin(accessToken))
          //   .then(() => {
            //     if (loginRejected) {
              //       navigate('/signup');
              //     } else {
                //       navigate('/');
                //     }
                //   });
                // })
                // .then(() => {
                  
                  // })
                  // .catch((error) => {
                    //   console.log('토큰 에러', error);
                    // });
                  })
          .then(() => {
            setTimeout(() => {
              navigate("/signup")
            }, 200)
          })
  }

  // 로그인 실패 시 회원가입 창으로 이동
  // useEffect(() => {
  //   console.log(loginRejected);
  //   if (loginRejected) {
  //     navigate('/signup');
  //   }
  // }, [loginRejected]);

};
export default NaverLogin;
