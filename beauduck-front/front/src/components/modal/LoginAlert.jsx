import Button from '../button/Button';

const LoginAlert = ({ onClickEvent }) => {
  return (
    <div className="login-alert">
      <p>로그인이 필요한 서비스입니다.</p>
      <Button text={'확인'} onClickEvent={onClickEvent} />
    </div>
  );
};

export default LoginAlert;
