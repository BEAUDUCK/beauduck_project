import { useState } from 'react';
import '../features/together/Together.style.scss';
import Banner from '../components/banner/Banner';
import TogetherList from '../features/together/TogetherList';
import TogetherModalCreate from '../features/together/TogetherModalCreate';
import BlackOut from '../components/blackout/BlackOut';

const TogetherPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const testList = [
    {
      id: 1,
      title: '투게덕덕',
      text: '안녕안녕안녕',
      host: '장현혁',
    },
    {
      id: 2,
      title: '오세요',
      text: '하이하이하이',
      host: 'Jack',
    },
    {
      id: 3,
      title: '하위',
      text: '안녕안녕',
      host: 'ZoD',
    },
    {
      id: 4,
      title: '투게덕덕',
      text: '안녕안녕안녕',
      host: '장현혁',
    },
    {
      id: 5,
      title: '오세요',
      text: '하이하이하이',
      host: 'Jack',
    },
    {
      id: 6,
      title: '하위',
      text: '안녕안녕',
      host: 'ZoD',
    },
    {
      id: 7,
      title: '투게덕덕',
      text: '안녕안녕안녕',
      host: '장현혁',
    },
    {
      id: 8,
      title: '오세요',
      text: '하이하이하이',
      host: 'Jack',
    },
    {
      id: 9,
      title: '하위',
      text: '안녕안녕',
      host: 'ZoD',
    },
    {
      id: 10,
      title: '투게덕덕',
      text: '안녕안녕안녕',
      host: '장현혁',
    },
    {
      id: 11,
      title: '오세요',
      text: '하이하이하이',
      host: 'Jack',
    },
    {
      id: 12,
      title: '하위',
      text: '안녕안녕',
      host: 'ZoD',
    },
    {
      id: 13,
      title: '투게덕덕',
      text: '안녕안녕안녕',
      host: '장현혁',
    },
    {
      id: 14,
      title: '오세요',
      text: '하이하이하이',
      host: 'Jack',
    },
    {
      id: 15,
      title: '하위',
      text: '안녕안녕',
      host: 'ZoD',
    },
  ];
  return (
    <>
      <Banner bannerStyle={'together-ban'} />
      <div className="container">
        <h2 className='together-h2' >투게덕</h2>
        <button onClick={isOpenModal}>방 만들기</button>
        <TogetherList roomList={testList} />
        {isOpen && <TogetherModalCreate isOpenModal={isOpenModal} />}
        {isOpen && <BlackOut onClickEvent={isOpenModal} />}
      </div>
    </>
  );
};

export default TogetherPage;
