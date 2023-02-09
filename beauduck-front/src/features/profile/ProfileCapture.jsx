import html2canvas from 'html2canvas';
import { useDispatch, useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import camera from '../../assets/camera.png';
import faceCircle from '../../assets/faceCircle.png';
import { postSaveFace } from './ProfileSlice';

const ProfileCapture = () => {
  const dispatch = useDispatch();
  const { memberId } = useSelector((state) => state.member);

  const downloadCapture = () => {
    const imgDiv = document.querySelector('#main_capture');
    const transform = imgDiv.style.transform;
    imgDiv.style.setProperty('transform', 'none');
    html2canvas(imgDiv).then((canvas) => {
      const imgUri = canvas.toDataURL('image/jpg');
      // const mainCapture = document.getElementById('main_capture');
      // const capture = document.createElement('img');
      // capture.setAttribute('src', imgUri);
      // capture.setAttribute('alt', 'capture');
      // capture.setAttribute('class', 'captured-img');
      // mainCapture.appendChild(capture);

      const payload = {
        memberId,
        img: imgUri,
      };
      dispatch(postSaveFace(payload));
    });
  };

  return (
    <div className="user-face">
      <div id="main_capture">
        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          className="webcam"
        />
        <img id="faceCircle" src={faceCircle} alt="" />
      </div>
      <img
        className="camera-img"
        src={camera}
        alt=""
        id="pick"
        onClick={downloadCapture}
      />
      <div>
        <h4>가이드</h4>
        <p> 1. 눈, 눈썹, 코, 입을 전부 보여주세요. </p>
        <p> 2. 원 위에 얼굴을 위치시켜 주세요.</p>
        <p> 3. 카메라 버튼을 클릭하세요.</p>
      </div>
    </div>
  );
};

export default ProfileCapture;
