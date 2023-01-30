import html2canvas from 'html2canvas';
import Webcam from 'react-webcam';
import SingleModalExitSurvey from '../features/single/SingleModalExitSurvey';

const SingleResultPage = () => {
  const downloadCapture = () => {
    html2canvas(document.querySelector('#main_capture')).then((canvas) => {
      saveAsImg(canvas.toDataURL('image/jpg'), 'lime.jpg');
      saveInGallery(canvas);
    });
  };

  // 이미지 요소로 저장 -> 갤러리에 사용하던지... 확인용으로 쓰던지
  const saveInGallery = (canvas) => {
    const mainCapture = document.getElementById('main_capture');
    mainCapture.appendChild(canvas);
  };
  // 이미지 파일로 저장 -> 추천 기능에 활용
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
    <div className="container">
      <h1>따라해덕 결과</h1>
      <div id="main_capture">
        <Webcam audio={false} screenshotFormat="image/jpeg" />
      </div>
      <button id="pick" onClick={downloadCapture}>
        다운로드
      </button>
      <SingleModalExitSurvey />
    </div>
  );
};

export default SingleResultPage;
