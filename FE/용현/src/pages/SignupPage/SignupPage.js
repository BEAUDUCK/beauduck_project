import { useState } from "react"
import Button from "../../components/Button";
import './Signup.css';

const SignupPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const SignupSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="signup-div">
      <h2>SIGNUP</h2>
      <form onSubmit={SignupSubmit}>
        <div>
          <label for="username">아이디</label>
          <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        </div>
        <div>
          <label for="password1">비밀번호</label>
          <input id="password1" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <label for="password2">비밀번호 확인</label>
          <input id="password2" type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
        </div>
        <Button text={"회원가입"} type="submit" />
      </form>
    </div>
  )
};

export default SignupPage;