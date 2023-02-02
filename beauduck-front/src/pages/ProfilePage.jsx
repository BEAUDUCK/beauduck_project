import { useState, useLayoutEffect } from 'react';
import './Profile.style.scss'
import ProfileMakeup from '../features/profile/ProfileMakeup';
import ProfileGallery from '../features/profile/ProfileGallery'
import ProfileFace from '../features/profile/ProfileFace'
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


  // useLayoutEffect(() => {
  //   const url = 'http://localhost:3000/'
  //   const urlSplit = url.split('/');
  //   if (urlSplit[urlSplit.length - 1] === 'gallery') onClickGallery();
  //   else if (urlSplit[urlSplit.length - 1] === 'capture') onClickCapture();
  // }, []);

  return (
    <div className='container'>
      <div className= 'profile-container'>
        <div className='imgbox'>
          <img className='img' src="images/default.png" />
        </div>
        <div className='profile-name'>
          <h2> 닉네임 </h2>
          <p> 자기소개를 입력하세요</p>
        </div>
      </div>

      <hr className='hr'/>
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
