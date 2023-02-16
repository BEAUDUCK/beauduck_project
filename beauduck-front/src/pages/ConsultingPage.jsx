import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD
=======
// import Banner from '../components/banner/Banner';
>>>>>>> 1b4cafb09db5fcc3a9500ff67c76b2ca5268a28c
import ConsultingList from '../features/help/ConsultingList';
import ConsultingModalCreate from '../features/help/ConsultingModalCreate ';
import {
  getConsultingList,
  getMakeupInfo,
  loadingOut,
} from '../features/help/ConsultingSlice';
import BlackOut from '../components/blackout/BlackOut';
import ConsultingModalLoadingHost from '../features/help/ConsultingModalLoadingHost';
import '../features/help/Help.style.scss';
import Swal from 'sweetalert2';

import Button from '../components/button/Button';
import megaphone from '../assets/megaphone.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Crawling from '../features/help/Crawling';
import face from '../assets/faces/face3.png';
import _ from 'lodash';
import ConsultingModalLoadingGuest from '../features/help/ConsultingModalLoadingGuest';
import banner from '../assets/help_banner.gif';

const ConsultingPage = () => {
  const dispatch = useDispatch();
  const { consultingList } = useSelector((state) => state.consulting);

  const [isOpen, setIsOpen] = useState(false);
  const myNickname = useSelector((state) => state.member.nickName);
  const isOpenModal = () => {
    if (!myNickname) {
      Swal.fire(
        '로그인이 필요한 서비스 입니다.',
        '로그인 해주시기 바랍니다.',
        'warning',
      );
      return <>{/* 로그인 모달창 이동 */}</>;
    } else {
      setIsOpen(!isOpen);
    }
  };

  const [isRandom, setIsRandom] = useState(false);
  const isOpenRandom = () => {
    setIsRandom(!isRandom);
  };

  const { isActive } = useSelector((state) => state.consulting);

  const loadingOff = () => {
    dispatch(loadingOut());
  };
  useEffect(() => {
    dispatch(getConsultingList());
    dispatch(getMakeupInfo());
  }, []);

  const randomOne = _.sample(consultingList);

  return (
    <>
      {/* <Banner bannerStyle={'help-ban'} /> */}
      <div className="banner-div">
        <img src={banner} alt="" id="help-banner" />
      </div>
      <div className="consulting-section1">
        <div className="consulting-section1-left">
          <div className="consulting-make-div">
            <h1>WHAT IS YOUR PERSONAL COLOR???</h1>
            <p>아직도 내 퍼스널 컬러를 모르겠다면???</p>
            <p>뷰덕에게 도움을 요청해덕!!</p>
            <div>
              <Button
                text={'컬러 진단받기'}
                onClickEvent={isOpenModal}
                btnStyle={'color-btn'}
              />
              <FontAwesomeIcon icon="fa-solid fa-circle-chevron-right" />
            </div>
            <img src={megaphone} alt="" />
          </div>
          <div className="random-consulting">
            <div className="random-cosult-left">
              <img src={face} alt="" />
              <p className="consult-nickname">{randomOne?.hostNickname}</p>
            </div>
            <div className="random-consult-right">
              {/* <p className="user-count">{randomOne?.userCount} / 6</p> */}
              <h3>{randomOne?.title}</h3>
              <p>{randomOne?.content}</p>
              <button onClick={isOpenRandom}>입장하기</button>
            </div>
          </div>
          {isRandom && (
            <ConsultingModalLoadingGuest
              roomId={randomOne.roomId}
              host={randomOne.hostNickname}
              isOpenClick={isOpenRandom}
            />
          )}
          {isRandom && <BlackOut />}
        </div>
        <ConsultingList consultingList={consultingList} />
      </div>
      {isOpen && <ConsultingModalCreate isOpenModal={isOpenModal} />}
      {isOpen && <BlackOut onClickEvent={isOpenModal} />}
      {isActive && <ConsultingModalLoadingHost loadingOff={loadingOff} />}
      {isActive && <BlackOut />}
      <Crawling />
    </>
  );
};

export default ConsultingPage;
