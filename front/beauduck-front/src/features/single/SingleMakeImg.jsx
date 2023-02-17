import { useState } from 'react';
import { useEffect } from 'react';

const SingleMakeImg = ({ step, getImg, toggleImg }) => {
  const subPic = () => {
    switch (step) {
      case 'eyebrow':
        return [
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/eyebrow_1.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/eyebrow_2.png',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/eyebrow_3.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/eyebrow_4.jpg',
        ];
      case 'shading':
        return [
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/shading1.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/shading2.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/shading3.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/shading4.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/shading5.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/shading6.jpg',
        ];
      case 'blusher':
        return [
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/blusher1.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/blusher2.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/blusher3.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/blusher4.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/blusher5.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/blusher6.jpg',
        ];
      case 'eyeliner':
        return [
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/eyeliner1.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/eyeliner2.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/eyeliner3.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/eyeliner4.jpg',
        ];
      case 'eyeshadow':
        return [
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/eyeshadow1.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/eyeshadow2.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/eyeshadow3.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/eyeshadow4.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/eyeshadow5.jpg',
          'https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/makeup/eyeshadow6.jpg',
        ];
      default:
        return [];
    }
  };

  const pics = subPic();

  const selectImg = (pic) => {
    getImg(pic);
    toggleImg();
  };

  return (
    <div className="select-sub-pic-div">
      <div className={`select-sub-pic-div-${step}`}>
        {pics.map((pic) => (
          <img
            src={pic}
            alt="pic"
            className="sub-pic"
            // className={['sub-pic', `pic-${step}`].join(' ')}
            onClick={() => selectImg(pic)}
          />
        ))}
      </div>
    </div>
  );
};

export default SingleMakeImg;
