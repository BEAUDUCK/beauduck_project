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

// 더미
import logo from '../assets/logo_original.png';

// 더미
const dummyRecentMakeup = [
  {
    id: 1,
    title: '메이크업 이름',
    score: 4.5,
    count: 120,
    img: 'https://i.pinimg.com/564x/81/35/fe/8135fe795a55fca3aa6bef751e635a83.jpg',
  },
  {
    id: 2,
    title: '메이크업 이름',
    score: 4.5,
    count: 120,
    img: 'https://i.pinimg.com/564x/9d/64/48/9d64485d6e974dc543bec98020e1e4c2.jpg',
  },
  {
    id: 3,
    title: '메이크업 이름',
    score: 4.5,
    count: 120,
    img: 'https://i.pinimg.com/564x/fb/c6/ac/fbc6ac067e01d6a15e8c44bdf871054c.jpg',
  },
  {
    id: 4,
    title: '제니 메이크업 완전 똑같음',
    score: 4.5,
    count: 120,
    img: 'https://i.pinimg.com/564x/6e/23/60/6e2360e9fe0dd6b7853c4914136863d6.jpg',
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
    img: 'https://i.pinimg.com/564x/f6/01/1f/f6011f2e8af8d464ce6053d9f905d461.jpg',
  },
  {
    id: 2,
    img: 'https://i.pinimg.com/564x/cd/2f/74/cd2f7423fef3f89a986856be87bf2a7e.jpg',
  },
  {
    id: 3,
    img: 'https://i.pinimg.com/564x/47/93/cd/4793cd24bc568fdb44d8769010344336.jpg',
  },
  {
    id: 4,
    img: 'https://i.pinimg.com/564x/88/2f/48/882f4862315b62c2646a2db0d2073028.jpg',
  },
  {
    id: 5,
    img: 'https://i.pinimg.com/736x/f2/12/43/f212432b2821a654404ca15fb90846d1.jpg',
  },
  {
    id: 6,
    img: 'https://i.pinimg.com/564x/6b/2f/f5/6b2ff5153b8d2a9c269974d91eb9b98b.jpg',
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
    dispatch(getMemberInfo(memberId));
    dispatch(getRecentMakeupList(memberId));
    dispatch(getMyMakeupList(memberId));
    dispatch(getMyGalleryList(memberId));
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default ProfilePage;
