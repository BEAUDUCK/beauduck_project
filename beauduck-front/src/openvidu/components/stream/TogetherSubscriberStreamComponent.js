import React, { Component, useState } from 'react';
// import './StreamComponent.css';
import TogetherSubscriberOvVideoComponent from './TogetherLocalOvVideo';

import MicOff from '@mui/icons-material/MicOff';
import VideocamOff from '@mui/icons-material/VideocamOff';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOff from '@mui/icons-material/VolumeOff';
// import FormControl from '@mui/core/FormControl';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@mui/material/IconButton';
import HighlightOff from '@mui/icons-material/HighlightOff';
// import FormHelperText from '@material-ui/core/FormHelperText';

const TogetherSubscriberStreamComponent = (props) => {
	const [nickname, setNickname] = useState(props.user.getNickname())
	const [showForm, setShowForm] = useState(false)
	const [mutedSound, setMutedSound] = useState(false)
	const [isFormValid, setIsFormValid] = useState(true)

	const toggleSound = () => {
		setMutedSound(!mutedSound)
	}

	return (
		<>
			<div style={{ position: "absolute", fontFamily: "Jalnan", fontSize: "20px" }}>{nickname}</div>
			<div className="streamComponent" style={{ width: "18vw", display: "flex", alignItems: "center" }} >
					<TogetherSubscriberOvVideoComponent user={props.user} mutedSound={mutedSound} />
			</div>
			{/* {props.user !== undefined && props.user.getStreamManager() !== undefined && (
				<div className="streamComponent">
				<div id="statusIcons">
						{!props.user.isVideoActive() ? (
								<div id="camIcon">
										<VideocamOff id="statusCam" />
								</div>
						) : null}

						{!props.user.isAudioActive() ? (
								<div id="micIcon">
										<MicOff id="statusMic" />
								</div>
						) : null}
				</div>
				<div>
						{!props.user.isLocal() && (
								<IconButton id="volumeButton" onClick={this.toggleSound}>
										{mutedSound ? <VolumeOff color="secondary" /> : <VolumeUp />}
								</IconButton>
						)}
				</div>
		</div>
			)} */}
		</>
);
};

export default TogetherSubscriberStreamComponent;