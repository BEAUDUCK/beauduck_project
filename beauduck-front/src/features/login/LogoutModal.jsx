// import axios from 'axios';
// import { useCookies } from 'react-cookie'
// import { useNavigate } from 'react-router-dom';


// const LogoutModal = () => {
//   const navigate = useNavigate();
//   const [cookies, setCookie, removeCookie] = useCookies(['cookie_name']);
//   const Logout = async (accessToken) => {
//     axios
//       .get(`http://i8b306.p.ssafy.io:8080/naver/logout?accessToken=${accessToken}`)
//       .then((res) => {
//       console.log(res.data.status);
//       removeCookie('accessToken');
//       localStorage.removeItem('refreshToken');
//       })
//       return(
//         navigate('/'))
      
//       .catch((error) => {
//         console.log(error);
//       });
//   };


//   return (
//     <div className='logout-container'>
//       <span>
//         정말 로그 아웃하시겠습니까?
//       </span>
//       <button onClick={Logout}> 네 </button>
//     </div>
//   )
// };

// export default LogoutModal;