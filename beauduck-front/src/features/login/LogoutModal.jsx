import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

const LogoutModal = () => {
  const [getCookie, setCookie, removeCookie] = useCookies(['cookie_name']);
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(getCookie('accessToken'));

  const Logout = async () => {
    try {
      const res = await axios.get(`http://i8b306.p.ssafy.io:8080/naver/logout?accessToken=${accessToken}`);
      console.log('시작');
      console.log(res.data.status);
      removeCookie('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='logout-container'>
      <span>
        정말 로그 아웃하시겠습니까?
      </span>
      <button onClick={Logout}> 네 </button>
    </div>
  );
};

export default LogoutModal;