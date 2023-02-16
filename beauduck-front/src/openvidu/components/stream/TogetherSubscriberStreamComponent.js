import React, { Component, useEffect, useState } from 'react';
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
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import FormHelperText from '@material-ui/core/FormHelperText';

const TogetherSubscriberStreamComponent = (props) => {
	const navigate = useNavigate()
	const [nickname, setNickname] = useState(props.user.getNickname())
	const [showForm, setShowForm] = useState(false)
	const [mutedSound, setMutedSound] = useState(false)
	const [isFormValid, setIsFormValid] = useState(true)
	const { leaveSession } = props
	const toggleSound = () => {
		setMutedSound(!mutedSound)
	}
	const color = ["#E8B0B0","#F03838","#EBEBEB","#FE9B7F","#F7F4EF","#C23445","#811F4C","#B28DB7","#3D2F2B","#BF1B36",
	"#FF8384","#81CCAB","#B9DDFF","#7EBC42","#8A97C3","#4A478C","#292830","#A18E40","#006359","#006E47",
	"#D1EEFB","#FDF650","#FEDCF5","#8884BE","#CEA9CB","#99A401","#422944","#818C75","#70491B","#FFFD36",
	"#FEBC60","#B2B099","#DBBAC7","#C189CA","#96B09D","#DD3737","#BCA548","#B8616D","#2F124E","#D73A6F",
	"#90E5D8","#5AC9E5","#F4CFFB","#F15D57","#B4BAD2","#006A8A","#535617","#546E6C","#5B2D41","#0000FE"]
	const myColor = _.sample(color)
	const { isActive } = useSelector(state => state.together)

	// 이부분 추가
	// useEffect(() => {
	// 	if (isActive) {
	// 		leaveSession()
	// 	}
	// }, [isActive])

	useEffect(() => {
		if (!props.session) {
			navigate("/together")
		}
	}, [props.session])

	return (
		<>
			<div style={{ position: "absolute", fontFamily: "Jalnan", fontSize: "20px", backgroundColor: "white", left: "70px" }}>{nickname}</div>
			<div className="streamComponent" style={{ width: "18vw", display: "flex", alignItems: "center" }} >
					<TogetherSubscriberOvVideoComponent user={props.user} mutedSound={mutedSound} myColor={myColor} />
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