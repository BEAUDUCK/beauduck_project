import './Single.style.scss';
import SingleListItem from './SingleListItem';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import SinglePopularItem from './SinglePopularItem';
import BlackOut from '../../components/blackout/BlackOut';
import SingleModalInfo from './SingleModalInfo';
import { useState } from 'react';

const SinglePopular = ({ modeList }) => {
  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 2,
    },
    920: {
      items: 3,
    },
    1280: {
      items: 4,
    },
    1536: {
      items: 5,
    },
  };

  const [isInfo, setIsInfo] = useState(false);
  const isToggleInfo = () => {
    setIsInfo(!isInfo);
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
          <>
            <SinglePopularItem key={item.id} modeItem={item} idx={idx + 1} />
            {isInfo && (
              <SingleModalInfo makeupId={item.id} isToggleInfo={isToggleInfo} />
            )}
            {isInfo && <BlackOut onClickEvent={isToggleInfo} />}
          </>
        ))}
      </AliceCarousel>
    </>
  );
};

export default SinglePopular;
