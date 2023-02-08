import * as React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './Signup.style.scss';
import { goToLogin, signUp } from '../features/login/MemberSlice';

const SignupPage = () => {
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [nickName, setNickName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const REDIRECT_URI = 'http://localhost:3000/Api/Naver';
  const CLIENT_ID = 'V5gN96q3kFtGfUK7PUds';
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=STATE_STRING&redirect_uri=${REDIRECT_URI}`;

  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();
  const nicknameRef = useRef();
  const contentRef = useRef();

  const [isUsable, setIsUsable] = useState(false);

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  // 닉네임 중복 확인
  const NickNameCheck = async (nickName) => {
    axios
      .get(`http://3.38.169.2:8080/members/check/${nickName}`)
      .then((res) => {
        if (!res.data.data) {
          setErrorMessage('사용 가능한 닉네임입니다');
          setIsUsable(true);
        } else {
          setErrorMessage('중복된 닉네임입니다.');
          setIsUsable(false);
        }
      });
  };

  const checkNickname = () => {
    if (nickName.length > 1) {
      NickNameCheck(nickName);
    } else {
      setErrorMessage('닉네임의 길이가 너무 짧습니다.');
      setIsUsable(false);
    }
  };

  // 회원가입
  const submitSignup = async (e) => {
    e.preventDefault();

    if (!nickName || !isUsable) {
      nicknameRef.current.focus();
      return;
    }

    const payload = [nickName, content, imgFile];
    console.log(payload);
    dispatch(goToLogin(payload));
    window.location.replace(NAVER_AUTH_URL);
  };

  return (
    <div className="signup-div">
      <div className="signup-div-left">
        {/* <img
          src="https://i.pinimg.com/564x/db/78/9b/db789bc183a83a2791ce05cccffb332d.jpg"
          alt=""
        /> */}
      </div>
      <div className="signup-div-right">
        <h1>회원가입</h1>
        <form onSubmit={submitSignup} className="signup-form">
          <img
            className="imgbox"
            src={imgFile ? imgFile : '/images/default.png'}
            alt="사진"
          ></img>
          <label htmlFor="imgFile" className="label-img">
            프로필 사진 업로드
          </label>
          <input
            className="input-box"
            id="imgFile"
            type="file"
            accept="image/*"
            onChange={saveImgFile}
            ref={imgRef}
          ></input>
          <label htmlFor="nickname" className="label-common">
            닉네임*
          </label>
          <span onClick={checkNickname}>중복 확인</span>
          <input
            ref={nicknameRef}
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          {errorMessage ? (
            <p className="errormessage">{errorMessage}</p>
          ) : (
            <></>
          )}
          <label htmlFor="content" className="label-common">
            자기소개
          </label>
          <textarea
            ref={contentRef}
            id="content"
            cols="20"
            rows="5"
            placeholder="자기소개를 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button>완료</button>
        </form>
      </div>
    </div>
  );
};
export default SignupPage;
