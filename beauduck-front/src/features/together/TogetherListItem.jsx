import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import duck1 from '../../assets/duck1.jpg';
import duck2 from '../../assets/duck2.jpg';
import duck3 from '../../assets/duck3.jpg';
import duck4 from '../../assets/duck4.jpg';
import duck5 from '../../assets/duck5.jpg';

const TogetherListItem = ({ room }) => {
  const randomImg = useCallback(() => {
    const ducks = [duck1, duck2, duck3, duck4, duck5];
    return _.sample(ducks);
  }, []);

  const [selectedImg, setSelectedImg] = useState('');

  useEffect(() => {
    setSelectedImg(randomImg());
  }, []);

  return (
    <div className="room-div">
      <div className={['room-div-sub', 'img-div'].join(' ')}>
        <img src={selectedImg} alt="duck" className="random-img" />
        <p>{room.host}</p>
      </div>
      <div className={['room-div-sub', 'text-div'].join(' ')}>
        <div className="text-first">
          <span className="id-num">{room.id}</span>
          <span>{room.title}</span>
        </div>
        <p className="p-content">{room.text}</p>
        <h3>FULL</h3>
      </div>
    </div>
  );
};

export default TogetherListItem;
