import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/banner/Banner';
import ConsultingList from '../features/help/ConsultingList';
import ConsultingModalCreate from '../features/help/ConsultingModalCreate ';
import {
  getConsultingList,
  loadingOut,
} from '../features/help/ConsultingSlice';
import BlackOut from '../components/blackout/BlackOut';
import ConsultingModalLoadingHost from '../features/help/ConsultingModalLoadingHost';

const ConsultingPage = () => {
  const dispatch = useDispatch();
  const { consultingList } = useSelector((state) => state.consulting);

  const [isOpen, setIsOpen] = useState(false);
  const isOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const { isActive } = useSelector((state) => state.consulting);

  const loadingOff = () => {
    dispatch(loadingOut());
  };
  useEffect(() => {
    dispatch(getConsultingList());
  }, []);

  return (
    <>
      <Banner bannerStyle={'help-ban'} />
      <div className="container">
        <h2 className="help-h2">도와주라덕</h2>
        <button onClick={isOpenModal}>컨설팅 받기</button>
        <ConsultingList consultingList={consultingList} />
        {isOpen && <ConsultingModalCreate isOpenModal={isOpenModal} />}
        {isOpen && <BlackOut onClickEvent={isOpenModal} />}
        {isActive && <ConsultingModalLoadingHost />}
        {isActive && <BlackOut onClickEvent={loadingOff} />}
      </div>
    </>
  );
};

export default ConsultingPage;
