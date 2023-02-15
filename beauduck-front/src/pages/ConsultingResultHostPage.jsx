import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
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

const ConsultingResultHostPage = () => {
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

  const { maxIdx } = useSelector((state) => state.consulting);

  return (
    <>
      <div className="container">
        <h1>컨설팅 결과</h1>
        <img src={resultList[maxIdx]} alt="" />
      </div>
    </>
  );
};

export default ConsultingResultHostPage;
