import { useState } from 'react';
import '../features/together/Together.style.scss';
import Banner from '../components/banner/Banner';
import TogetherList from '../features/together/TogetherList';
import TogetherModalCreate from '../features/together/TogetherModalCreate';
import BlackOut from '../components/blackout/BlackOut';
import { useEffect } from 'react';
import { getTogetherList } from "../features/together/TogetherSlice"
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/button/Button';
import Swal from 'sweetalert2';
import TogetherBanner from "../assets/together_banner.gif"
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TogetherPage = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const myNickname = useSelector(state => state.member.nickName)
  const isOpenModal = () => {
    if (!myNickname) {
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
    setIsOpen(!isOpen);
  };

  const { togetherList } = useSelector((state) => state.together)
  const { state } = location
  

  useEffect(() => {
    dispatch(getTogetherList())
    // if (state) {
    //     axios
		// 			.post("https://i8b306.p.ssafy.io:8084/together/out", state)
		// 			.then((res) => {
		// 				console.log("삭제 완료")
		// 			})
    // }
  }, [])

  return (
    <>
    <div className='together-banner'>
      <img
        className='together-banner-img'
        src={TogetherBanner}
        alt="together-banner"
      />
    </div>
      <div className="container">
        <div className='together-btn-div'>
          <Button onClickEvent={isOpenModal} text={"방 만들러 가기"} btnStyle={"together-btn"} />
          <FontAwesomeIcon icon="fa-solid fa-circle-chevron-right" />
        </div>
        <h2 className='together-h2'>진행중인 방</h2>
        {/* <button onClick={isOpenModal}>방 만들기</button> */}
        <TogetherList togetherList={togetherList} />
        {isOpen && <TogetherModalCreate isOpenModal={isOpenModal} />}
        {isOpen && <BlackOut onClickEvent={isOpenModal} />}
      </div>
    </>
  );
};

export default TogetherPage;
