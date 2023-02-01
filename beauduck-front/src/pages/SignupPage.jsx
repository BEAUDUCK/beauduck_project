import { useNavigate } from 'react-router-dom';
import Button from "../components/button/Button";
import { useState, useRef } from 'react';

const SignupPage = () => {
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
  return (
    <div className='container'>
      <div className = 'container-signup'>
        {/* 업로드 된 이미지 미리보기 */}
          <img
            className = "imgbox"
            src={
              imgFile
                ? imgFile
                : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`}
              alt="사진">
          </img>
          <input
            className='input-box'
            type="file"
            accept="image/*"
            onChange={saveImgFile}
            ref={imgRef}></input>
        </div>
            {/* 이미지 업로드 input */}
          
        
        <div className="profile-name-signup">
          <input className="input1" type="text" value="닉네임을 입력해주세요"/>
          <br />
          <input className="input2" type="text" value=" 자기소개를 300자 이내로 작성해주세요"/>
        </div>
        <h4>완료 버튼을 클릭하면 BeauDuck의 약관, 개인정보처리방침 및 쿠키 정책에 동의하게 됩니다.</h4> 
      <p onClick={() => navigate('/')}> 완료
      </p>      
    </div> 

  );
};
export default SignupPage;