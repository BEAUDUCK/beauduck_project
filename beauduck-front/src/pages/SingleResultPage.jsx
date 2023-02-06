import html2canvas from 'html2canvas';
import { useDispatch, useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import SingleModalExitSurvey from '../features/single/SingleModalExitSurvey';
import { saveImage } from '../features/single/SingleSlice';

const SingleResultPage = () => {
  const dispatch = useDispatch();
  const { memberId } = useSelector((state) => state.member);

  const downloadCapture = () => {
    html2canvas(document.querySelector('#main_capture')).then((canvas) => {
      const imgUri = canvas.toDataURL('image/jpg');
      const mainCapture = document.getElementById('main_capture');
      const capture = document.createElement('img');
      capture.setAttribute('src', imgUri);
      capture.setAttribute('alt', 'capture');
      capture.setAttribute('class', 'captured-img');
      mainCapture.appendChild(capture);
      setTimeout(function () {
        deleteImgElement(mainCapture, capture);
      }, 3000);

      const payload = {
        memberEntity: {
          id: memberId,
        },
        is_active: true,
        img: imgUri,
      };
      console.log(payload);
      dispatch(saveImage(payload));
    });
  };

  const deleteImgElement = (upper, sub) => {
    upper.removeChild(sub);
  };
  return (
    <div className="full-screen">
      <div className="capture-div">
        <h1 className="capture-h1">최종 결과</h1>
        <div id="main_capture" className="main-capture">
          <Webcam
            style={{
              position: 'absolute',
              marginRight: 'auto',
              marginLeft: 'auto',
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: 1,
              width: 640,
              height: 480,
            }}
            mirrored={true}
            audio={false}
            className="webcam-result"
            screenshotFormat="image/jpeg"
          />
        </div>

        <button id="pick" className="download-btn" onClick={downloadCapture}>
          저장하기
        </button>
      </div>
      {/* <SingleModalExitSurvey /> */}
    </div>
  );
};

export default SingleResultPage;
