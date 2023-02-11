import React, { Component, useEffect, useRef, useState } from 'react';
import './StreamComponent.css';
// import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';
// import { Camera } from '@mediapipe/camera_utils';

const HostVideoComponent = ( props ) => {

	const user = props.user
	const mutedSound = props.mutedSound
	const videoRef = useRef()
	console.log(user)
	useEffect(() => {
		if (props && user?.streamManager && !!videoRef) {
			user?.getStreamManager().addVideoElement(videoRef.current)
		}

		if (props && user?.streamManager.session && user && !!videoRef) {
			user.streamManager.session.on("signal:userChanged", (event) => {
				const data = JSON.parse(event.data)
				if (data.isScreenShareActive !== undefined) {
					user?.getStreamManager().addVideoElement(videoRef.current)
				}
			})
		}
	}, [])

	useEffect(() => {
		if (props && !!videoRef) {
			user?.getStreamManager().addVideoElement(videoRef.current)
		}
		console.log("@@@@@@@@@@@", props)
	}, [user, mutedSound, props])

	return (
		<div className='OvVideo' style={{ height: "95%", position: "relative" }}>
			<video
				className='input_video'
				autoPlay={true}
				id={props.user}
				ref={videoRef}
				muted={mutedSound}
				style={{ position: "absolute", left: "0" }}
			/>
			<canvas className="output_canvas" style={{ position: "relative", width: "100%", height: "100%", transform: "rotateY(180deg)" }}></canvas>
		</div>
	);

};

export default HostVideoComponent;