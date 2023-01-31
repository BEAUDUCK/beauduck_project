import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../features/facemesh/Facemesh.style.scss';
import FacemeshFeature from '../features/facemesh/FacemeshFeature';
import duck from '../assets/duck1.jpg';
import SingleModeSequence from '../features/single/SingleModeSequence';
import { useState } from 'react';
import ExitModal from '../components/modal/ExitModal';
import { useNavigate } from 'react-router-dom';

const SingleModePage = () => {
  const navigate = useNavigate();
  const [isExit, setIsExit] = useState(false);

  return (
    <div className="full-screen">
      <div className="left-div">
        <div className="out" onClick={() => setIsExit(!isExit)}>
          {isExit && (
            <ExitModal
              title={'정말 나가시겠습니까?'}
              content={'진행 중이던 세션은 자동으로 종료됩니다.'}
              btnText={'나가기'}
              onClickEvent={() => navigate('/single')}
            />
          )}
          <FontAwesomeIcon icon="fa-solid fa-circle-chevron-left" />
          <p>나가기</p>
        </div>
        <img src={duck} alt="예시 이미지" className="sample-img" />
        <br />
        <span className="color-circle">g</span>
      </div>
      <div className="center-div">
        <FacemeshFeature />
      </div>
      <div className="right-div">
        <SingleModeSequence />
      </div>
    </div>
  );
};
export default SingleModePage;
