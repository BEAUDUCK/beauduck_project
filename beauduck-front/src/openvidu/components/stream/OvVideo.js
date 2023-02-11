import React, { Component, useState, useEffect, useRef } from 'react';
import './StreamComponent.css';

const OvVideoComponent = (props) => {
	const [streamManager, setStreamManager] = useState(props.streamManager);
	const videoRef = useRef()
	console.log(props.user.streamManager)

	useEffect(() => {
		if (props.streamManager) {
			setStreamManager(props.streamManager.addVideoElement(videoRef.current))
		}
	}, [props.streamManager])

	return (
		<div className='OvVideo' style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
			<video
				className='input_video'
				autoPlay={true}
				id={'video-' + props.user.getStreamManager().stream.streamId}
				ref={videoRef}
				muted={props.mutedSound}
				style={{ width: "30vh",height: "18vh" }}
			/>
	</div>
	)
}

export default OvVideoComponent;