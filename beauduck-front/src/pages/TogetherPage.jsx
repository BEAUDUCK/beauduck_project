import { useState } from 'react';
import '../features/together/Together.style.scss';
import Banner from '../components/banner/Banner';
import TogetherList from '../features/together/TogetherList';
import TogetherModalCreate from '../features/together/TogetherModalCreate';
import BlackOut from '../components/blackout/BlackOut';
import { useEffect } from 'react';
import { getTogetherList } from "../features/together/TogetherSlice"
import { useDispatch, useSelector } from 'react-redux';

const TogetherPage = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const isOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const { togetherList } = useSelector((state) => state.together)

  useEffect(() => {
    dispatch(getTogetherList())
  }, [])

  return (
    <>
      <Banner bannerStyle={'together-ban'} />
      <div className="container">
        <h2 className='together-h2' >투게덕</h2>
        <button onClick={isOpenModal}>방 만들기</button>
        <TogetherList togetherList={togetherList} />
        {isOpen && <TogetherModalCreate isOpenModal={isOpenModal} />}
        {isOpen && <BlackOut onClickEvent={isOpenModal} />}
      </div>
    </>
  );
};

export default TogetherPage;
