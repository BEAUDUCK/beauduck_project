import html2canvas from 'html2canvas';
import { useDispatch, useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import SingleModalExitSurvey from '../features/single/SingleModalExitSurvey';
import { saveImage } from '../features/single/SingleSlice';
import React from 'react';
import { useState } from 'react';
import BlackOut from '../components/blackout/BlackOut';

const SingleResultPage = () => {
  const dispatch = useDispatch();
  const { memberId } = useSelector((state) => state.member);

  const [isPop, setIsPop] = useState(false);

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

      // saveAsImg(imgUri, 'pic.jpg');

      const payload = {
        memberEntity: {
          id: memberId,
        },
        isActive: true,
        img: imgUri,
      };
      dispatch(saveImage(payload));
      setTimeout(setIsPop(true), 2000);
    });
  };

  // const saveAsImg = (uri, filename) => {
  //   const link = document.createElement('a');
  //   if (typeof link.download === 'string') {
  //     link.href = uri;
  //     link.download = filename;

  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } else {
  //     window.open(uri);
  //   }
  // };

  const deleteImgElement = (upper, sub) => {
    upper.removeChild(sub);
  };

  return (
    <div className="full-screen">
      <div className="capture-div">
        <h1 className="capture-h1">최종 결과</h1>
        <div className="main-capture" id="main_capture">
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
      {isPop && <SingleModalExitSurvey />}
      {isPop && <BlackOut />}
    </div>
  );
};

export default SingleResultPage;
