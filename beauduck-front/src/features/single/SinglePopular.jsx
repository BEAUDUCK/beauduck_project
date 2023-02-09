import './Single.style.scss';
import SingleListItem from './SingleListItem';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import SinglePopularItem from './SinglePopularItem';

const SinglePopular = ({ modeList }) => {
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    768: {
      items: 4,
    },
    1024: {
      items: 5,
    },
    1280: {
      items: 6,
    },
    1536: {
      items: 7,
    },
  };

  return (
    <>
      <AliceCarousel
        disableDotsControls
        disableButtonsControls
        // mouseTracking
        responsive={responsive}
        autoPlay
        infinite={100}
        animationDuration={2000}
        // animationEasingFunction="linear"
        // autoPlayStrategy="action"    // 호버하면 멈춤 (default)
        className="popular"
      >
        {modeList?.map((item, idx) => (
          <SinglePopularItem key={item.id} modeItem={item} idx={idx + 1} />
        ))}
      </AliceCarousel>
    </>
  );
};

export default SinglePopular;
