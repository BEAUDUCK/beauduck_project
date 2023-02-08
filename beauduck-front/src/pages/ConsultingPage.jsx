import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/banner/Banner';
import ConsultingList from '../features/help/ConsultingList';
import ConsultingModalCreate from '../features/help/ConsultingModalCreate ';
import { getConsultingList } from '../features/help/ConsultingSlice';
import BlackOut from "../components/blackout/BlackOut"

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
    {
      id: 4,
      title: '룰루',
      text: '오지마세요 ㅋㅋ',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 5,
      title: '랄라',
      text: '오지마세요 ㅋㅋ',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 6,
      title: '하하하',
      text: '하이하이하이하이하이',
      host: '나님',
      status: '진행 중',
    },
    {
      id: 7,
      title: '키키키',
      text: '안녕안녕안녕안녕',
      host: '나야나',
      status: '모집 중',
    },
    {
      id: 8,
      title: '룰루',
      text: '어서오세요 빨리오세요 제발오세요',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 9,
      title: '룰루',
      text: '오지마세요 ㅋㅋ',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 10,
      title: '랄라',
      text: '오지마세요 ㅋㅋ',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 11,
      title: '하하하',
      text: '하이하이하이하이하이',
      host: '나님',
      status: '진행 중',
    },
    {
      id: 12,
      title: '키키키',
      text: '안녕안녕안녕안녕',
      host: '나야나',
      status: '모집 중',
    },
    {
      id: 13,
      title: '룰루',
      text: '어서오세요 빨리오세요 제발오세요',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 14,
      title: '룰루',
      text: '오지마세요 ㅋㅋ',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 15,
      title: '랄라',
      text: '오지마세요 ㅋㅋ',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 16,
      title: '하하하',
      text: '하이하이하이하이하이',
      host: '나님',
      status: '진행 중',
    },
    {
      id: 17,
      title: '키키키',
      text: '안녕안녕안녕안녕',
      host: '나야나',
      status: '모집 중',
    },
    {
      id: 18,
      title: '룰루',
      text: '어서오세요 빨리오세요 제발오세요',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 19,
      title: '룰루',
      text: '오지마세요 ㅋㅋ',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 20,
      title: '랄라',
      text: '오지마세요 ㅋㅋ',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 21,
      title: '하하하',
      text: '하이하이하이하이하이',
      host: '나님',
      status: '진행 중',
    },
    {
      id: 22,
      title: '키키키',
      text: '안녕안녕안녕안녕',
      host: '나야나',
      status: '모집 중',
    },
    {
      id: 23,
      title: '룰루',
      text: '어서오세요 빨리오세요 제발오세요',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 24,
      title: '룰루',
      text: '오지마세요 ㅋㅋ',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 25,
      title: '랄라',
      text: '오지마세요 ㅋㅋ',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 26,
      title: '하하하',
      text: '하이하이하이하이하이',
      host: '나님',
      status: '진행 중',
    },
    {
      id: 27,
      title: '키키키',
      text: '안녕안녕안녕안녕',
      host: '나야나',
      status: '모집 중',
    },
    {
      id: 28,
      title: '룰루',
      text: '어서오세요 빨리오세요 제발오세요',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 29,
      title: '룰루',
      text: '오지마세요 ㅋㅋ',
      host: '룰루',
      status: '모집 중',
    },
    {
      id: 30,
      title: '랄라',
      text: '오지마세요 ㅋㅋ',
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
        <h2 className='help-h2'>도와주라덕</h2>
        <button onClick={isOpenModal}>컨설팅 받기</button>
        <ConsultingList consultingList={TestList} />
        {isOpen && <ConsultingModalCreate isOpenModal={isOpenModal} />}
        {isOpen && <BlackOut onClickEvent={isOpenModal} />}
      </div>
    </>
  );
};

export default ConsultingPage;
