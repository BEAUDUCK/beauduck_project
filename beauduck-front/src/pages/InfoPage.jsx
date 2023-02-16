// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InfoPage.style.scss';
import color1 from '../assets/color1.png';
import color2 from '../assets/color2.png';

const InfoPage = () => {
  // const [result, setResult] = useState(0);
  const navigate = useNavigate();

  const showResult = (num) => {
    navigate('/color/detail', { state: num });
  };

  return (
    <div className="personal-color">
      <div className="color-info ball">
        {/* <img src={color1} alt="" className="color1" /> */}
        {/* <img src={color2} alt="" className="color2" /> */}
        <h1>퍼스널 컬러</h1>
        <p>사람의 피부톤과 가장 어울리는 색상을 찾는 색채학 이론</p>
        <p>본인에게 어떤 색이 베스트, 워스트인지 알고 싶을 때 이용하면 좋다</p>
      </div>
      <div>
        <div className="spring-div">
          <img
            src="/images/personal/spring1.png"
            alt=""
            onClick={() => showResult(1)}
          />
          <img
            src="/images/personal/spring2.png"
            alt=""
            onClick={() => showResult(2)}
          />
        </div>

        <div className="summer-div">
          <img
            src="/images/personal/summer1.png"
            alt=""
            onClick={() => showResult(3)}
          />
          <img
            src="/images/personal/summer2.png"
            alt=""
            onClick={() => showResult(4)}
          />
          <img
            src="/images/personal/summer3.png"
            alt=""
            onClick={() => showResult(5)}
          />
        </div>
        <div className="autumn-div">
          <img
            src="/images/personal/autumn1.png"
            alt=""
            onClick={() => showResult(6)}
          />
          <img
            src="/images/personal/autumn2.png"
            alt=""
            onClick={() => showResult(7)}
          />
          <img
            src="/images/personal/autumn3.png"
            alt=""
            onClick={() => showResult(8)}
          />
        </div>
        <div className="winter-div">
          <img
            src="/images/personal/winter1.png"
            alt=""
            onClick={() => showResult(9)}
          />
          <img
            src="/images/personal/winter2.png"
            alt=""
            onClick={() => showResult(10)}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
