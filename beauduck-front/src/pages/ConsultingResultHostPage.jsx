import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './InfoPage.style.scss';
import result1 from '../assets/consultresult/springlight.png';
import result2 from '../assets/consultresult/springbright.png';
import result3 from '../assets/consultresult/summerlight.png';
import result4 from '../assets/consultresult/summerbright.png';
import result5 from '../assets/consultresult/summermute.png';
import result6 from '../assets/consultresult/fallstrong.png';
import result7 from '../assets/consultresult/falldeep.png';
import result8 from '../assets/consultresult/fallmute.png';
import result9 from '../assets/consultresult/winterdeep.png';
import result10 from '../assets/consultresult/winterbright.png';
import { deleteConsultingRoom } from '../features/help/ConsultingSlice';

const ConsultingResultHostPage = () => {
  const dispatch = useDispatch();
  const { roomId, maxIdx } = useSelector((state) => state.consulting);

  const resultList = [
    result1,
    result2,
    result3,
    result4,
    result5,
    result6,
    result7,
    result8,
    result9,
    result10,
  ];

  useEffect(() => {
    dispatch(deleteConsultingRoom(roomId));
  });

  return (
    <>
      <div className="container" style={{ textAlign: 'center' }}>
        <img src={resultList[maxIdx]} alt="" className="personal-detail" />
      </div>
    </>
  );
};

export default ConsultingResultHostPage;
