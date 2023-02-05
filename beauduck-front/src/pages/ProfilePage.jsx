import './Profile.style.scss'
import ProfileMakeup from '../features/profile/ProfileMakeup';
import ProfileGallery from '../features/profile/ProfileGallery'
import ProfileFace from '../features/profile/ProfileFace'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RankingPage from './RankingPage';
import { useDispatch, useSelector } from 'react-redux';

import { getMemberInfo } from '../features/profile/ProfileSlice';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMemberInfo());
  }, [dispatch]);
  // 닉네임 불러오기
  const { nickName } = useSelector((state) => state.member);

  const [isMakeup, setIsMakeup] = useState(true);
  const [isGallery, setIsGallery] = useState(false);
  const [isCapture, setIsCapture] = useState(false);

  // 탭 이동  함수
  const onClickMakeup = () => {
    setIsMakeup(true);
    setIsGallery(false);
    setIsCapture(false);
  };

  const onClickGallery = () => {
    setIsMakeup(false);
    setIsGallery(true);
    setIsCapture(false);
  };

  const onClickCapture = () => {
    setIsMakeup(false);
    setIsGallery(false);
    setIsCapture(true);
  };

  // 이미지 파일 업로드 함수
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  }
  // 회원 닉네임 중복 여부 확인
  // const NickNameCheck = async (nickName) => {
  //   axios
  //   .get(`http://i8b306.p.ssafy.io:8080/members/check/${nickName}`)
  //   .then((res) => {
  //     console.log(res.data.data, '사용 가능');
  //     if (res.data.data === false) {  
  //       setErrorMessage("사용 가능합니다.")
  //     }
  //     else {
  //       setErrorMessage("중복된 닉네임입니다.")
  //     }
  //   })}  
// };

  return (
    <div className='container'>
      <div className='container-profile'>
      <div>
          <img
            className = "imgbox"
            src={
              imgFile
                ? imgFile
                : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`}
              alt="사진">
          </img>
          <br />
          <input
            className='input-box'
            type="file"
            accept="image/*"
            onChange={saveImgFile}
            ref={imgRef}></input>

            <br></br>
            <br></br>


            <Grid container sm={7} spacing={3}>

              <Grid item sm={12}>
                <TextField
                  required
                  id="outlined-required"
                  defaultValue= {nickName}
                /> 
              </Grid>
              <div></div>
              <Grid item sm={12}>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  fullWidth
                  rows={4}
                  defaultValue="자기소개 내용"
                />     
              </Grid>
            </Grid>
            </div>
            <RankingPage/>
      </div>
      <br/>
      <hr className='hr'/>
      <br/>
        <div className="linkButton">
          <div
            className={isMakeup ? 'clickButton' : 'NavButton'}
            onClick={onClickMakeup}>
            메이크업
          </div>
        </div>
        <div className="linkButton">
          <div
            className={isGallery ? 'clickButton' : 'NavButton'}
            onClick={onClickGallery}>
            갤러리
          </div>
          </div>
        <div className="linkButton">
          <div 
            className={isCapture ? 'clickButton' : 'NavButton'}
            onClick={onClickCapture}>
            얼굴정보
          </div>
        </div>
        {/* 탭 전환에 따른 데이터 공개 */}
        {isMakeup && <ProfileMakeup/>}
        {isGallery && <ProfileGallery/>}
        {isCapture && <ProfileFace/>}
      
    </div>
  );
};

export default ProfilePage;
