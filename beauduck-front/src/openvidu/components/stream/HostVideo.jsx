import React, { Component, useEffect, useRef, useState } from 'react';
import './StreamComponent.css';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';
import { Camera } from '@mediapipe/camera_utils';

const HostVideoComponent = ( props ) => {
	const { user, mutedSound, nowColor } = props
	const videoRef = useRef()
	useEffect(() => {
		if (props && user.streamManager && !!videoRef) {
			user.getStreamManager().addVideoElement(videoRef.current)
		}

		if (props && user.streamManager.session && user && !!videoRef) {
			user.streamManager.session.on("signal:userChanged", (event) => {
				const data = JSON.parse(event.data)
				if (data.isScreenShareActive !== undefined) {
					user.getStreamManager().addVideoElement(videoRef.current)
				}
			})
		}
	}, [])

	useEffect(() => {
		if (props && !!videoRef) {
			user.getStreamManager().addVideoElement(videoRef.current)
		}
	}, [user, mutedSound, props])

	// useEffect(() => {
	// 	const videoElement = document.getElementsByClassName('input_video')[0];
  //   const canvasElement = document.getElementsByClassName('output_canvas')[0];
  //   const canvasCtx = canvasElement.getContext('2d');

  //   function onResults(results) {
  //     canvasCtx.save();
  //     canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  //     canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height);

  //     // Only overwrite existing pixels.
  //     canvasCtx.globalCompositeOperation = 'source-out';
  //     canvasCtx.fillStyle = nowColor;
  //     // fillRect(시작점 x, y좌표, width, height)
  //     canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  //     // Only overwrite missing pixels.
  //     canvasCtx.globalCompositeOperation = 'destination-atop';
  //     canvasCtx.drawImage(
  //         results.image, 0, 0, canvasElement.width, canvasElement.height);

  //     canvasCtx.restore();
  //   }

  //   const selfieSegmentation = new SelfieSegmentation({locateFile: (file) => {
  //       return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
  //       }});
  //   selfieSegmentation.setOptions({
  //       modelSelection: 1,
  //   });
  //   selfieSegmentation.onResults(onResults);

  //   const camera = new Camera(videoElement, {
  //     onFrame: async () => {
  //       await selfieSegmentation.send({image: videoElement});
  //     },
  //   });
  //   camera.start();
	// })


	return (
		<div className='OvVideo' style={{ height: "95%", position: "relative" }}>
			<video
				className='input_video'
				autoPlay={true}
				id={'video-' + props.user.getStreamManager().stream.streamId}
				ref={videoRef}
				muted={mutedSound}
				style={{ position: "absolute", left: "0" }}
			/>
			<canvas className="output_canvas" style={{ position: "relative", width: "100%", height: "100%", transform: "rotateY(180deg)" }}></canvas>
		</div>
	);

};

export default HostVideoComponent;