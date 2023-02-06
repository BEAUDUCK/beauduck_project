import { FaceMesh } from '@mediapipe/face_mesh';
import * as Facemesh from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';
import Webcam from 'react-webcam';
import { useRef, useEffect } from 'react';

// 일단 CDN으로 쓰긴 했는데 필요한 것은 다 다운로드 받으면 아마 될거같음.

{
  /* <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js" crossorigin="anonymous"></script> */
}

// 이부분 public/index.html에 넣어놨었음

const FacemeshFeature = ({ nowMain, nowStep }) => {
  console.log('페이스', nowMain, nowStep);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let camera = null;
  const connect = window.drawConnectors;

  function onResults(results) {
    // 아래 두개 없으면 선이 두꺼워지는듯??
    canvasRef.current.width = webcamRef.current.video.videoWidth;
    canvasRef.current.height = webcamRef.current.video.videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');
    canvasCtx.save();

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height,
    );

    const leftEye = [
      [226, 113],
      [225, 224],
      [223, 222],
      [221, 189],
    ];

    const rightEye = [
      [413, 441],
      [442, 443],
      [444, 445],
      [342, 446],
    ];

    const leftCheek = [
      [206, 216],
      [214, 192],
      [213, 147],
      [123, 117],
      [118, 101],
      [36, 206],
    ];

    const rightCheek = [
      [266, 330],
      [347, 346],
      [352, 376],
      [433, 416],
      [434, 436],
      [426, 266],
    ];

    // const forehead = [
    //   [103, 67], [67, 109], [109, 10], [10, 338], [338, 297], [297, 332]
    // ]

    const leftEyebrow = [
      [107, 55],
      [55, 65],
      [65, 52],
      [52, 53],
      [53, 46],
      [46, 70],
      [70, 63],
      [63, 105],
      [105, 66],
      [66, 107],
    ];

    const rightEyebrow = [
      [336, 296],
      [296, 334],
      [334, 293],
      [293, 300],
      [300, 276],
      [276, 283],
      [283, 282],
      [282, 295],
      [295, 285],
      [285, 336],
    ];

    // const leftNoseList = [
    //   221, 193, 122, 196, 3, 51, 134, 131, 49, 198, 174, 188, 245, 189, 221
    // ]

    const leftNose = [
      [221, 193],
      [193, 122],
      [122, 196],
      [196, 3],
      [3, 51],
      [51, 134],
      [134, 131],
      [131, 49],
      [49, 198],
      [198, 174],
      [174, 188],
      [188, 245],
      [245, 189],
      [189, 221],
    ];

    const rightNoseList = [
      441, 417, 351, 419, 248, 281, 363, 360, 279, 420, 399, 412, 465, 413, 441,
    ];

    const rightNose = [
      [441, 417],
      [417, 351],
      [351, 419],
      [419, 248],
      [248, 281],
      [281, 363],
      [363, 360],
      [360, 279],
      [279, 420],
      [420, 399],
      [399, 412],
      [412, 465],
      [465, 413],
      [413, 441],
    ];

    if (results.multiFaceLandmarks) {
      switch (nowMain) {
        case 'skin':
          for (const landmarks of results.multiFaceLandmarks) {
            connect(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
              color: '#E0E0E0',
              lineWidth: 1,
            });
          }
          break;
        case 'eyebrow':
          for (const landmarks of results.multiFaceLandmarks) {
            connect(canvasCtx, landmarks, leftEyebrow, {
              color: '#C0C0C0',
              lineWidth: 1,
            });
            connect(canvasCtx, landmarks, rightEyebrow, {
              color: '#C0C0C0',
              lineWidth: 1,
            });
          }
          break;

        case 'eye': {
          for (const landmarks of results.multiFaceLandmarks) {
            connect(canvasCtx, landmarks, leftEye, {
              color: '#C0C0C0',
              lineWidth: 1,
            });
            connect(canvasCtx, landmarks, rightEye, {
              color: '#C0C0C0',
              lineWidth: 1,
            });
          }
          break;
        }

        case 'conture': {
          switch (nowStep) {
            case 'shading': {
              for (const landmarks of results.multiFaceLandmarks) {
                connect(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
                  color: '#E0E0E0',
                  lineWidth: 1,
                });
                connect(canvasCtx, landmarks, leftNose, {
                  color: '#C0C0C0',
                  lineWidth: 1,
                });
                connect(canvasCtx, landmarks, rightNose, {
                  color: '#C0C0C0',
                  lineWidth: 1,
                });
              }
              break;
            }
            case 'blusher': {
              for (const landmarks of results.multiFaceLandmarks) {
                connect(canvasCtx, landmarks, leftCheek, {
                  color: '#C0C0C0',
                  lineWidth: 1,
                });
                connect(canvasCtx, landmarks, rightCheek, {
                  color: '#C0C0C0',
                  lineWidth: 1,
                });
              }
              break;
            }
          }
          break;
        }
        case 'lip': {
          for (const landmarks of results.multiFaceLandmarks) {
            connect(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
              color: '#887788',
              lineWidth: 1,
            });
          }
          break;
        }
      }
      canvasCtx.restore();
    }
  }
  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      selfieMode: true,
    });

    faceMesh.onResults(onResults);

    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  });

  return (
    <div className="Facemesh">
      <Webcam
        ref={webcamRef}
        style={{
          position: 'absolute',
          marginRight: 'auto',
          marginLeft: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: 640,
          hegiht: 480,
        }}
        className="webcam"
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginRight: 'auto',
          marginLeft: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: 640,
          height: 480,
        }}
        className="canvas"
      />
    </div>
  );
};

export default FacemeshFeature;
