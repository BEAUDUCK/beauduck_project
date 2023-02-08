import React, { Component, useEffect, useRef, useState } from 'react';
import './StreamComponent.css';

// export default class HostVideoComponent extends Component {
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
//         return (
//                 <div className='OvVideo' style={{ height: "65vh" }}>
//                     <video
//                         className='input_video'
//                         autoPlay={true}
//                         id={'video-' + this.props.user.getStreamManager().stream.streamId}
//                         ref={this.videoRef}
//                         muted={this.props.mutedSound}
//                     />
//                 </div>
//         );
//     }
// }

const HostVideoComponent = ( props ) => {
	const { user, mutedSound } = props
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

	return (
		<div className='OvVideo' style={{ height: "65vh" }}>
			<video
				className='input_video'
				autoPlay={true}
				id={'video-' + props.user.getStreamManager().stream.streamId}
				ref={videoRef}
				muted={mutedSound}
			/>
		</div>
	);

};

export default HostVideoComponent;