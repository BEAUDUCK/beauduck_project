import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome/index';
import { useSelector } from 'react-redux';

const SingleModalRecommend = ({ popRecommend }) => {
  // 닉네임 받아오기
  const { nickName } = useSelector((state) => state.member);
  // 추천 메이크업 5개
  const { recommendList } = useSelector((state) => state.single);

  const closeModal = () => {
    popRecommend();
  };

  return (
    <div className="recommend-modal">
      <FontAwesomeIcon
        className="recommend-xmark"
        icon="fa-solid fa-xmark"
        onClick={closeModal}
      />
      <h3>{nickName}님에게 어울리는 추천 메이크업</h3>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={3}
        pagination={{ clickable: true }}
      >
        {recommendList.length != 0 ? (
          <>
            {recommendList.map((item) => (
              <SwiperSlide>
                <div className="recommended-makeup-div">
                  <img src={item?.img} alt="img" />
                  <p>{item?.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </>
        ) : (
          <></>
        )}
      </Swiper>
    </div>
  );
};

export default SingleModalRecommend;
