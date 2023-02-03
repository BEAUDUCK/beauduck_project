import './Profile.style.scss'
import ProfileMakeup from '../features/profile/ProfileMakeup';
import ProfileGallery from '../features/profile/ProfileGallery'
import ProfileFace from '../features/profile/ProfileFace'
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RankingPage from './RankingPage';

const ProfilePage = () => {
  const [isMakeup, setIsMakeup] = useState(true);
  const [isGallery, setIsGallery] = useState(false);
  const [isCapture, setIsCapture] = useState(false);

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
  // useLayoutEffect(() => {
  //   const url = 'http://localhost:3000/'
  //   const urlSplit = url.split('/');
  //   if (urlSplit[urlSplit.length - 1] === 'gallery') onClickGallery();
  //   else if (urlSplit[urlSplit.length - 1] === 'capture') onClickCapture();
  // }, []);

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

              <Grid item sm={7}>
                <TextField
                  required
                  id="outlined-required"
                  defaultValue="닉네임"
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
        {isMakeup && <ProfileMakeup/>}
        {isGallery && <ProfileGallery/>}
        {isCapture && <ProfileFace/>}
      
    </div>
  );
};

export default ProfilePage;
