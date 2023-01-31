import axios from 'axios';
import { useCookies } from 'react-cookie'
import { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom';




const NaverLogin = () => {

  const NAVER_REQUEST = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=V5gN96q3kFtGfUK7PUds&state=STATE_STRING&redirect_uri=http://localhost:3000/Api/Naver`
  const code = new URL(window.location.href).Params.get("code");
  // let navigate = useNavigate();

  const getToken = async () => {
    const formdata = new FormData();
    formdata.append("code",code);
  try {
  axios
    .get(
      `http://3.38.169.2:8080/naver/callback?code=${formdata}&state={STRING_STATE}`
    )
    .then(function (response) {
        console.log(response.data)
        localStorage.setItem('accessToken', response.data.accessToken);
        alert('로그인이 정상적으로 완료되었습니다');
        // return(
        //   navigate('/')
        // )
      })
      .catch(function (error) {
        alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다');
      });  
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
  
    </div>
    )
  };

export default NaverLogin;