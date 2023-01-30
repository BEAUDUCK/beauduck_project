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

const FacemeshFeature = () => {
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

    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
          color: '#C0C0C070',
          lineWidth: 1,
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
          color: '#FF3030',
          lineWidth: 2,
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {
          color: '#FF3030',
          lineWidth: 2,
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
          color: '#30FF30',
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
          color: '#30FF30',
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
          color: '#E0E0E0',
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
          color: '#E0E0E0',
        });
      }
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
      // selfieMode: true, 거울모드?
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
          hegiht: 480,
        }}
      />
    </div>
  );
};

export default FacemeshFeature;
