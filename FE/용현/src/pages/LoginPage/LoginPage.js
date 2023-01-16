import { useState } from "react"
import Button from "../../components/Button";
import './Login.css';

const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const LoginSubmit = e => {
    e.preventDefault();
  };


  return (
    <div className="login-div">
      <h2>LOGIN</h2>
      <form onSubmit={LoginSubmit}>
        <div>
          <label for="username">아이디</label>
          <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        </div>
        <div>
          <label for="password">비밀번호</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <Button text={"로그인"} type="submit" />
      </form>
    </div>
  )
};

export default LoginPage;