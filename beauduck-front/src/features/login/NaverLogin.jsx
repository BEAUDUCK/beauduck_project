import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMemberId } from './MemberSlice';

const NaverLogin = () => {
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get('code');
  const state = new URL(window.location.href).searchParams.get('state');
  const [cookies, setCookie, removeCookie] = useCookies(['cookie_name']);

  const navigate = useNavigate();
  const nickName = useSelector((state) => state.member)
  const getToken = async () => {
      axios
        .get(`http://i8b306.p.ssafy.io:8080/naver/callback?code=${code}&state=${state}`,
        )
        .then((res) => {
          console.log('시작_확인용');
          console.log(res.data.data);
          localStorage.setItem('refreshToken', res.data.data.refreshToken);
          console.log('로컬스토리지', localStorage)
          const accessToken = res.data.data.accessToken;
          console.log('액세스 확인', accessToken)
          const expireDate = new Date();
          expireDate.setMinutes(expireDate.getMinutes()+ 20);
          setCookie(
            'accessToken',
            {accessToken},
            {
              path: '/',
              expires: expireDate,
            },
            );
          alert('인증 완료');
          console.log('check')
          RegisterCheck(accessToken)
          console.log('등록여부확인 시작')
          // NicknameCheck(nickName)
          // Signup()
          // console.log('회원가입 완료')
          // Login(accessToken);
        })
          
          console.log('ddd')
          .catch((error) => {
            console.log('에러_확인용')
            console.log(error);
          });  
        };

      const RegisterCheck = async (accessToken) => {
        axios
          .get(`http://i8b306.p.ssafy.io:8080/naver/check?accessToken=${accessToken}`)
          .then((res) => {
            console.log(res.data.data)
            if (!res.data.data) {
              console.log('기존 회원')
              Login(accessToken);
              navigate('/')
              console.log('로그인 완료')
            } else if (res.data.data) {
              console.log('회원가입 가능')
              navigate('/signup')
              console.log('닉네임 미등록')

            } 
          })
        }
        
      const Login = async (accessToken) => {
          axios
            .get(`http://i8b306.p.ssafy.io:8080/naver/login?accessToken=${accessToken}`)
            .then((res) => {
            console.log(res.data.data);
            dispatch(getMemberId(res.data.data));
            })
            .catch((error) => {
              console.log('에러_확인용')
              console.log(error);
            });
        };


  useEffect(() => {
    getToken();
  }, []);

}
export default NaverLogin;
