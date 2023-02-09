import { useEffect, useState } from 'react';
import Paging from '../../components/pagination/Paging';
import './Single.style.scss';
import SingleListItem from './SingleListItem';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const SingleList = ({ modeList }) => {
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    860: {
      items: 4,
    },
    1210: {
      items: 5,
    },
    1470: {
      items: 6,
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
        className="modeList"
      >
        {modeList.map((item, idx) => (
          <SingleListItem key={item.id} modeItem={item} idx={idx + 1} />
        ))}
      </AliceCarousel>
    </>
  );
};

export default SingleList;
