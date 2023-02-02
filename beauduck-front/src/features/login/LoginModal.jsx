import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginModal = () => {
  const REDIRECT_URI = 'http://localhost:3000/Api/Naver';
  const CLIENT_ID = 'V5gN96q3kFtGfUK7PUds';
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=STATE_STRING&redirect_uri=${REDIRECT_URI}`;

  return (
    <div className="login-container">
      <span>LOGIN</span>
      <a href={NAVER_AUTH_URL}>
        <img src="images/naver-circle.png" />
        Naver
      </a>
    </div>
  );
};

export default LoginModal;
