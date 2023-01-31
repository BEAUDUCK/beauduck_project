const NaverLogin = () => {

  const NAVER_REQUEST = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=V5gN96q3kFtGfUK7PUds&state=STATE_STRING&redirect_uri=http://localhost:3000/Api/Naver`
  
  return (
    <div>
      <span>
        LOGIN
      </span>
      <a href={NAVER_REQUEST}>
        <img src="images/naver-circle.png"/>Naver
      </a>
    </div>

  );
};

export default NaverLogin;