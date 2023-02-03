import _ from 'lodash';
import { useState, useCallback, useEffect } from 'react';

import duck1 from '../../assets/duck1.jpg';
import duck2 from '../../assets/duck2.jpg';
import duck3 from '../../assets/duck3.jpg';
import duck4 from '../../assets/duck4.jpg';
import duck5 from '../../assets/duck5.jpg';

const ConsultingListItem = ({ consultingItem }) => {

  const randomImage = useCallback(() => {
    const ducks = [duck1, duck2, duck3, duck4, duck5]
    return _.sample(ducks)
  }, [])
  
  const [seletedImg, setSelectedImg] = useState("")

  useEffect(() => {
    setSelectedImg(randomImage());
  }, []);

  return (
    <div className="consulting-div">
      <div className="consulting-first">
        {/* 이미지는 무엇을 넣더라 ? 랜덤 이미지 ? */}
        <img src={seletedImg} alt="duck" className='random-img'/>
        <p>{consultingItem.host}</p>
      </div>
      <div className="consulting-second">
        <p>{consultingItem.title}</p>
        <p>{consultingItem.text}</p>
      </div>
    </div>
  );
};

export default ConsultingListItem;
