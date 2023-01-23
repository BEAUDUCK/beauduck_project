export default function SocialLogin() {
  
  const NAVER_REQUEST = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=V5gN96q3kFtGfUK7PUds&state=STATE_STRING&redirect_uri=http://localhost:3000/Api/Naver`

  const KAKAO_REQUEST = `https://kauth.kakao.com/oauth/authorize?client_id=393ba7c2a9b9a2f8e10cac07d4aabe16&redirect_uri=http://localhost:3000/&response_type=code`
  return (
    <div>
      <ul>
        <div>
          <div></div>
          <span>
            Login
          </span>
          <div></div>
        </div>
          <a href={KAKAO_REQUEST}>
            <img src="images/login/kakao-circle.png"/>
            <span>Kakao</span>
          </a>
          <a
            href={NAVER_REQUEST}>
            <img src="images/login/naver-circle.png"/>
            <span>Naver</span>
          </a>
      </ul>
    </div>
  )
}