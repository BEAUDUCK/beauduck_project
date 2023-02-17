import { useEffect } from "react";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import { Camera } from "@mediapipe/camera_utils";

const BackgroundColor = () => {

  useEffect(() => {
    const videoElement = document.getElementsByClassName('input_video')[0];
    const canvasElement = document.getElementsByClassName('output_canvas')[0];
    const canvasCtx = canvasElement.getContext('2d');

    function onResults(results) {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height);

      // Only overwrite existing pixels.
      // source-in : 나 자신 색이 바뀜
      // source-out : 배경 색이 바뀜
      canvasCtx.globalCompositeOperation = 'source-out';
      // 여기 부분에 색상 코드 넣으면 될거같음
      canvasCtx.fillStyle = '#0067A3';
      // fillRect(시작점 x, y좌표, width, height)
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

      // Only overwrite missing pixels.
      // 빠진 픽셀 덮어쓰기
      canvasCtx.globalCompositeOperation = 'destination-atop';
      canvasCtx.drawImage(
          results.image, 0, 0, canvasElement.width, canvasElement.height);

      canvasCtx.restore();
    }

    const selfieSegmentation = new SelfieSegmentation({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
        }});
    selfieSegmentation.setOptions({
        modelSelection: 1,
    });
    selfieSegmentation.onResults(onResults);

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await selfieSegmentation.send({image: videoElement});
      },
      width: 1280,
      height: 720
    });
    camera.start();
  }, [])


  return (
    <div className="App">
      <div className="container">
        <video className="input_video" style={{ position: "absolute" }} ></video>
        <canvas className="output_canvas" width="1280px" height="720px" style={{ position: "relative" }} ></canvas>
      </div>
    </div>
  )
}


export default BackgroundColor;