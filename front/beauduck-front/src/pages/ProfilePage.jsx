import { useEffect } from 'react';
import { useState } from 'react';
import MyMakeupList from '../features/profile/MyMakeupList';
import MyProfile from '../features/profile/MyProfile';
import MyProfileSaveFace from '../features/profile/MyProfileSaveFace';
import MyRanking from '../features/profile/MyRanking';
import MyGalleryList from '../features/profile/MyGalleryList';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMemberInfo,
  getMyGalleryList,
  getMyMakeupList,
  getRecentMakeupList,
} from '../features/profile/ProfileSlice';
import tab2 from '../assets/pallete1.png';
import tab1 from '../assets/pallete2.png';
import tab3 from '../assets/pallete3.png';

import Swal from 'sweetalert2';

const ProfilePage = () => {
  const [makeupState, setMakeupState] = useState(true);
  const [galleryState, setGalleryState] = useState(false);
  const [faceState, setFaceState] = useState(false);
  const dispatch = useDispatch();

  const handleMakeup = () => {
    setMakeupState(true);
    setGalleryState(false);
    setFaceState(false);
  };

  const handleGallery = () => {
    setMakeupState(false);
    setGalleryState(true);
    setFaceState(false);
  };

  const handleFace = () => {
    setMakeupState(false);
    setGalleryState(false);
    setFaceState(true);
  };

  const ChangeTab = () => {
    if (makeupState) {
      return (
        <MyMakeupList
          recentMakeup={recentMakeupList}
          madeMakeup={myMakeupList}
        />
      );
    } else if (galleryState) {
      return <MyGalleryList myGalleryList={myGalleryList} />;
    } else {
      return <MyProfileSaveFace />;
    }
  };

  const { memberId } = useSelector((state) => state.member);
  const { recentMakeupList, myMakeupList, myGalleryList } = useSelector(
    (state) => state.profile,
  );
  useEffect(() => {
    if (!memberId) {

      Swal.fire(
        "로그인이 필요한 서비스 입니다.",
        "로그인 페이지로 이동합니다.",
        "warning"
      )
      return (
        <>
          {/* 로그인 모달창 이동 */}
        </>
      )
    }
  }, [])

  useEffect(() => {
    dispatch(getMemberInfo(memberId));
    dispatch(getRecentMakeupList(memberId));
    dispatch(getMyMakeupList(memberId));
    dispatch(getMyGalleryList(memberId));
  }, []);

  return (
    <>
      <div className="ProfilePage">
        <MyProfile />
        <MyRanking />
      </div>
      <hr />
      <div className="btn-div">
        <div onClick={handleMakeup}>
          <p className="btn-ma">메이크업</p>
          <img
            src={tab1}
            alt=""
            className={makeupState ? 'tab-selected' : ''}
          />
        </div>
        <div onClick={handleGallery}>
          <p className="btn-ga">갤러리</p>
          <img
            src={tab2}
            alt=""
            className={galleryState ? 'tab-selected' : ''}
          />
        </div>
        <div onClick={handleFace}>
          <p className="btn-pi">사진찍기</p>
          <img src={tab3} alt="" className={faceState ? 'tab-selected' : ''} />
        </div>
      </div>
      <ChangeTab />
    </>
  );
};

export default ProfilePage;
