import { useState } from 'react';
import '../features/together/Together.style.scss';
import Banner from '../components/banner/Banner';
import TogetherList from '../features/together/TogetherList';
import TogetherModalCreate from '../features/together/TogetherModalCreate';

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
  ];
  return (
    <>
      <Banner bannerStyle={'together-ban'} />
      <div className="container">
        <h1>투게덕</h1>
        <button onClick={isOpenModal}>방 만들기</button>
        {isOpen && <TogetherModalCreate isOpenModal={isOpenModal} />}
        <TogetherList roomList={testList} />
      </div>
    </>
  );
};

export default TogetherPage;
