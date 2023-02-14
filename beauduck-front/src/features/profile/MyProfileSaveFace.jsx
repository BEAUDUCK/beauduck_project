import html2canvas from 'html2canvas';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import camera from '../../assets/camera.png';
import faceCircle from '../../assets/faceCircle.png';
import { postSaveFace } from './ProfileSlice';
import Alert from '../../components/modal/Alert';

const MyProfileSaveFace = () => {
  const dispatch = useDispatch();
  const { memberId } = useSelector((state) => state.member);

  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  const downloadCapture = () => {
    setIsOpen(!isOpen);
    const imgDiv = document.querySelector('#main_capture');
    const transform = imgDiv.style.transform;
    imgDiv.style.setProperty('transform', 'none');
    html2canvas(imgDiv).then((canvas) => {
      const imgUri = canvas.toDataURL('image/jpeg');
      // const mainCapture = document.getElementById('main_capture');
      // const capture = document.createElement('img');
      // capture.setAttribute('src', imgUri);
      // capture.setAttribute('alt', 'capture');
      // capture.setAttribute('class', 'captured-img');
      // mainCapture.appendChild(capture);
      // saveAsImg(imgUri, 'yong.jpg');
      const payload = {
        memberId,
        img: imgUri,
      };
      dispatch(postSaveFace(payload));
    });
  };

  const saveAsImg = (uri, filename) => {
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  };

  return (
    <div className="face-capture-div">
      <h3>얼굴 정보는 추천 알고리즘에 사용됩니다</h3>
      <div className="user-face">
        {isOpen ? (
          <Alert text={'완료'} onClickEvent={() => setIsOpen(!isOpen)} />
        ) : (
          ''
        )}
        <div id="main_capture">
          {/* <div id="main_capture"> */}
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
          {/* </div> */}
          <img id="faceCircle" src={faceCircle} alt="" />
        </div>
        <div className="guide-div">
          <img
            className="camera-img"
            src={camera}
            alt=""
            id="pick"
            onClick={downloadCapture}
          />
          <div>
            <h3>가이드</h3>
            <p> 1. 눈, 눈썹, 코, 입을 전부 보여주세요. </p>
            <p> 2. 원 위에 얼굴을 위치시켜 주세요.</p>
            <p> 3. 카메라 버튼을 클릭하세요.</p>
          </div>
          <a href="/single#section1-ai">메이크업 추천 받기</a>
        </div>
      </div>
    </div>
  );
};

export default MyProfileSaveFace;
