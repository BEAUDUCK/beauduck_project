import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome/index';

const SingleModalRecommend = ({ popRecommend }) => {
  // 닉네임 받아오기
  // 마이페이지에 유저 얼굴 사진 저장한거 받아오기
  // 추천 메이크업 5개

  const closeModal = () => {
    popRecommend();
  };

  const makeupList = [
    {
      id: 1,
      title: '데일리 메이크업',
      img: 'https://i.pinimg.com/236x/00/23/13/0023139711735d03774be660adcad98c.jpg',
    },
    {
      id: 2,
      title: '물광 메이크업',
      img: 'https://i.pinimg.com/236x/86/2f/31/862f310c3e879aefcbf50748758e32cc.jpg',
    },
    {
      id: 3,
      title: '데일리 메이크업',
      img: 'https://i.pinimg.com/236x/00/23/13/0023139711735d03774be660adcad98c.jpg',
    },
    {
      id: 4,
      title: '물광 메이크업',
      img: 'https://i.pinimg.com/236x/86/2f/31/862f310c3e879aefcbf50748758e32cc.jpg',
    },
    {
      id: 5,
      title: '데일리 메이크업',
      img: 'https://i.pinimg.com/236x/00/23/13/0023139711735d03774be660adcad98c.jpg',
    },
  ];

  return (
    <div className="recommend-modal">
      <FontAwesomeIcon
        className="recommend-xmark"
        icon="fa-solid fa-xmark"
        onClick={closeModal}
      />
      <h3>님에게 어울리는 추천 메이크업</h3>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={3}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div className="recommended-makeup-div">
            <img src={makeupList[0].img} alt="img" />
            <p>{makeupList[0].title}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <div className="recommended-makeup-div">
            <img src={makeupList[1].img} alt="img" />
            <p>{makeupList[1].title}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <div className="recommended-makeup-div">
            <img src={makeupList[2].img} alt="img" />
            <p>{makeupList[2].title}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <div className="recommended-makeup-div">
            <img src={makeupList[3].img} alt="img" />
            <p>{makeupList[3].title}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <div className="recommended-makeup-div">
            <img src={makeupList[4].img} alt="img" />
            <p>{makeupList[4].title}</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SingleModalRecommend;
