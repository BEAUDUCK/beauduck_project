import React, { Component, useEffect, useRef } from 'react';
import './StreamComponent.css';

const OvVideoComponent = (props) => {
	console.log("#############", props.streamManager)
	const [streamManager, setStreamManager] = useState(props.streamManager);
	const videoRef = useRef()

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
				id={'video-' + this.props.user.getStreamManager().stream.streamId}
				ref={this.videoRef}
				muted={this.props.mutedSound}
				style={{ width: "30vh",height: "18vh" }}
			/>
	</div>
	)
}

export default OvVideoComponent;