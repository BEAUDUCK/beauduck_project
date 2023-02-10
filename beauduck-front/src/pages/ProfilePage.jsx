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
// 더미
import logo from '../assets/logo_original.png';

// 더미
const dummyRecentMakeup = [
  {
    id: 1,
    title: '메이크업 이름',
    score: 4.5,
    count: 120,
    img: logo,
  },
  {
    id: 2,
    title: '메이크업 이름',
    score: 4.5,
    count: 120,
    img: logo,
  },
  {
    id: 3,
    title: '메이크업 이름',
    score: 4.5,
    count: 120,
    img: logo,
  },
];

const dummyMadeMakeup = [
  {
    id: 1,
    title: '메이크업 이름',
    score: 4.5,
    count: 120,
    img: logo,
  },
  {
    id: 2,
    title: '메이크업 이름',
    score: 4.5,
    count: 120,
    img: logo,
  },
  {
    id: 3,
    title: '메이크업 이름',
    score: 4.5,
    count: 120,
    img: logo,
  },
];

const dummyGallery = [
  {
    id: 1,
    img: logo,
  },
  {
    id: 2,
    img: logo,
  },
  {
    id: 3,
    img: logo,
  },
];

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
          recentMakeup={dummyRecentMakeup}
          madeMakeup={dummyMadeMakeup}
          recentMakeupList={recentMakeupList}
          myMakeupList={myMakeupList}
        />
      );
    } else if (galleryState) {
      return (
        <MyGalleryList gallery={dummyGallery} myGalleryList={myGalleryList} />
      );
    } else {
      return <MyProfileSaveFace />;
    }
  };

  const { memberId } = useSelector((state) => state.member);
  const { recentMakeupList, myMakeupList, myGalleryList } = useSelector(
    (state) => state.profile,
  );

  useEffect(() => {
    dispatch(getMemberInfo(memberId));
    dispatch(getRecentMakeupList(memberId));
    dispatch(getMyMakeupList(memberId));
    dispatch(getMyGalleryList(memberId));
  }, []);

  return (
    <div className="container">
      <div className="ProfilePage">
        <MyProfile />
        <MyRanking />
      </div>
      <div>
        <button
          onClick={handleMakeup}
          className={['profile-tab', makeupState ? 'tab-selected' : ''].join(
            ' ',
          )}
        >
          메이크업 목록
        </button>
        <button
          onClick={handleGallery}
          className={['profile-tab', galleryState ? 'tab-selected' : ''].join(
            ' ',
          )}
        >
          갤러리
        </button>
        <button
          onClick={handleFace}
          className={['profile-tab', faceState ? 'tab-selected' : ''].join(' ')}
        >
          사진찍기
        </button>
      </div>
      <div>
        <ChangeTab />
      </div>
    </div>
  );
};

export default ProfilePage;
