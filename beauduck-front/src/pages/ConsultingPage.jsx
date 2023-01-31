import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/banner/Banner';
import ConsultingList from '../features/help/ConsultingList';
import ConsultingModalCreate from '../features/help/ConsultingModalCreate ';
import { getConsultingList } from '../features/help/ConsultingSlice';

const ConsultingPage = () => {
  const dispatch = useDispatch();
  const consultingList = useSelector((state) => state.consultingList);
  const TestList = [
    {
      id: 1,
      title: '하하하',
      text: '하이하이하이하이하이',
      host: '나님',
      status: '진행 중',
    },
    {
      id: 2,
      title: '키키키',
      text: '안녕안녕안녕안녕',
      host: '나야나',
      status: '모집 중',
    },
    {
      id: 3,
      title: '룰루',
      text: '어서오세요 빨리오세요 제발오세요',
      host: '룰루',
      status: '모집 중',
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const isOpenModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(getConsultingList());
  }, [dispatch]);

  return (
    <>
      <Banner bannerStyle={'help-ban'} />
      <div className="container">
        <h2>모집 중인 컨설팅</h2>
        <button onClick={isOpenModal}>컨설팅 받기</button>
        <ConsultingList consultingList={TestList} />
        {isOpen && <ConsultingModalCreate isOpenModal={isOpenModal} />}
      </div>
    </>
  );
};

export default ConsultingPage;
