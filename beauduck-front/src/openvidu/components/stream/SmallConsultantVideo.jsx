import React, { Component, useEffect, useRef, useState } from 'react';
import './StreamComponent.css';

const SmallConstultantVideo = (props) => {
	console.log("@@@@@@@@@@", props.user.streamManager.session)
	const [streamManager, setStreamManager] = useState(props.streamManager)
	const videoRef = useRef()

	useEffect(() => {
		if (props && props.user.streamManager && !!videoRef) {
			props.user.getStreamManager().addVideoElement(videoRef.current)
		}

		if (props && props.user.streamManager.session && props.user && !!videoRef) {
			props.user.streamManager.session.on("signal:userChanged", (event) => {
				const data = JSON.parse(event.data);
				if (data.isScreenShareActive !== undefined) {
					props.user.getStreamManager().addVideoElement(videoRef.current)
				}
			})
		}
	}, [])

	useEffect(() => {
		if (props && !!videoRef) {
			props.user.getStreamManager().addVideoElement(videoRef.current)
		}
	})

	return (
		<div className='OvVideo' style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
			<video
				className='input_video'
				autoPlay={true}
				id={'video-' + props.user.getStreamManager().stream.streamId}
				ref={videoRef}
				muted={props.mutedSound}
				style={{ width: "30vh",height: "20Vh" }}
			/>
			<div>
				{props.nick}
			</div>
		</div>
	);
}

export default SmallConstultantVideo;

// export default class SmallConstultantVideo extends Component {
//     constructor(props) {
//         super(props);
//         this.videoRef = React.createRef();
//     }

//     componentDidMount() {
//         if (this.props && this.props.user.streamManager && !!this.videoRef) {
//             console.log('PROPS: ', this.props);
//             this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
//         }

//         if (this.props && this.props.user.streamManager.session && this.props.user && !!this.videoRef) {
//             this.props.user.streamManager.session.on('signal:userChanged', (event) => {
//                 const data = JSON.parse(event.data);
//                 if (data.isScreenShareActive !== undefined) {
//                     this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
//                 }
//             });
//         }
//     }

//     componentDidUpdate(props) {
//         if (props && !!this.videoRef) {
//             this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
//         }
//     }
    
//     render() {
// 			return (
// 				<div className='OvVideo' style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
// 				<video
// 					className='input_video'
// 					autoPlay={true}
// 					id={'video-' + this.props.user.getStreamManager().stream.streamId}
// 					ref={this.videoRef}
// 					muted={this.props.mutedSound}
// 					style={{ width: "30vh",height: "20Vh" }}
// 				/>
// 				<div>
// 					{this.props.nick}
// 				</div>
// 			</div>
// 			)
//     }
// }
