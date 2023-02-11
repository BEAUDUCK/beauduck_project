import * as React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './Signup.style.scss';
import { goToLogin, signUp, UserLogin } from '../features/login/MemberSlice';
import { getAccessToken } from '../api/cookie';
import logo from '../assets/logo_original.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = getAccessToken('accessToken');

  const [content, setContent] = useState('');
  const [nickName, setNickName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // const [imgFile, setImgFile] = useState('');
  // const imgRef = useRef();
  const nicknameRef = useRef();
  const contentRef = useRef();

  const [isUsable, setIsUsable] = useState(false);

  // const saveImgFile = () => {
  //   const file = imgRef.current.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImgFile(reader.result);
  //   };
  // };

  // 닉네임 중복 확인
  const NickNameCheck = async (nickName) => {
    axios
      .get(`https://i8b306.p.ssafy.io:8080/members/check/${nickName}`)
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

    // const formData = new FormData();
    // formData.append('img', imgRef.current.files[0]);
    const payload = {
      accessToken,
      nickName,
      content,
    };
    console.log(payload);
    // const payload = {
    //   signupRequestDto,
    //   img: formData,
    // };
    // formData.append('data', JSON.stringify(signupRequestDto));
    // console.log(formData.get('img'));
    // console.log(formData);
    dispatch(signUp(payload)).then(() => navigate('/'));
  };

  return (
    <div className="container">
      <div className="signup-div">
        <img className="logo" src={logo} alt="" />
        <h1>회원가입</h1>
        <form onSubmit={submitSignup} className="signup-form">
          {/* <img
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
            multiple="multiple"
          ></input> */}
          <label htmlFor="nickname" className="label-common">
            닉네임*
          </label>
          <input
            ref={nicknameRef}
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <span
            onClick={checkNickname}
            className={['check', isUsable && 'checked'].join(' ')}
          >
            <FontAwesomeIcon icon="fa-regular fa-circle-check" />
          </span>
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
