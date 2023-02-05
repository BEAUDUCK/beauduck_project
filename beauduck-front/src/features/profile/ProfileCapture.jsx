import html2canvas from 'html2canvas';
import Webcam from 'react-webcam';

{/* 아래부터는 용현이 제공해준 캡쳐 폼 */}

const ProfileCapture = () => {
  const downloadCapture = () => {
    html2canvas(document.querySelector('#main_capture')).then((canvas) => {
      saveInGallery(canvas);      
    });
  };
  const saveInGallery = (canvas) => {
    const mainCapture = document.getElementById('main_capture');
  // mainCapture.appendChild(canvas);
  };
  return (
  <div className="container">
    <div id="main_capture">
        <Webcam audio={false} screenshotFormat="image/jpeg" />
    </div>
    <button id="pick" onClick={downloadCapture}>
        다운로드
      </button>
  </div>
  );
};

export default ProfileCapture;