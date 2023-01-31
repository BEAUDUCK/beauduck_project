import './LoginModal.style.scss'
import NaverLogin from './NaverLogin'
const LoginModal = () => {
  return (
    <div className='login-container'>
      <span>
        LOGIN
      </span>
      <a href='https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=V5gN96q3kFtGfUK7PUds&state=STATE_STRING&redirect_uri=http://localhost:3000/Api/Naver'>
        <img src="images/naver-circle.png"/>Naver
      </a>
    </div>
  )
};

export default LoginModal;