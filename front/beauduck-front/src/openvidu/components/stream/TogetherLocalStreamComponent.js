import _ from 'lodash';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { changeIsActive } from '../../../features/together/TogetherSlice';
import './StreamComponent.css';
import TogetherLocalOvVideoComponent from './TogetherLocalOvVideo';

// import MicOff from '@mui/icons-material/MicOff';
// import VideocamOff from '@mui/icons-material/VideocamOff';
// import VolumeUp from '@mui/icons-material/VolumeUp';
// import VolumeOff from '@mui/icons-material/VolumeOff';
// import FormControl from '@mui/core/FormControl';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import IconButton from '@material-ui/core/IconButton';
// import HighlightOff from '@mui/icons-material/HighlightOff';
// import FormHelperText from '@material-ui/core/FormHelperText';

const TogetherLocalStreamComponent = (props) => {
	const [nickname, setNickname] = useState(props.user.getNickname())
	// const [showForm, setShowForm] = useState(false)
	const [mutedSound, setMutedSound] = useState(false)
	// const [isFormValid, setIsFormValid] = useState(true)
	const color = ["#E8B0B0","#F03838","#EBEBEB","#FE9B7F","#F7F4EF","#C23445","#811F4C","#B28DB7","#3D2F2B","#BF1B36",
	"#FF8384","#81CCAB","#B9DDFF","#7EBC42","#8A97C3","#4A478C","#292830","#A18E40","#006359","#006E47",
	"#D1EEFB","#FDF650","#FEDCF5","#8884BE","#CEA9CB","#99A401","#422944","#818C75","#70491B","#FFFD36",
	"#FEBC60","#B2B099","#DBBAC7","#C189CA","#96B09D","#DD3737","#BCA548","#B8616D","#2F124E","#D73A6F",
	"#90E5D8","#5AC9E5","#F4CFFB","#F15D57","#B4BAD2","#006A8A","#535617","#546E6C","#5B2D41","#0000FE"]

	const myColor = _.sample(color)
	// const { isHost, leaveSession } = props
	const dispatch = useDispatch()

	console.log(props)
	// 추가한 부분
	// useEffect(() => {
	// 	if (leaveSession) {
	// 		if (isHost) {
	// 			dispatch(changeIsActive())
	// 		}
	// 	}
	// }, [])

	// useEffect(() => {
	// 	if (props.deleteRoom) {
	// 		dispatch(changeIsActive())
	// 	}
	// }, [props])

	console.log(nickname)
	return (
		<>
			<div className="streamComponent" style={{ display: "flex", justifyContent: "", alignItems: "center" }} >
					<TogetherLocalOvVideoComponent user={props.user} mutedSound={mutedSound} myColor={myColor}/>
			</div>
			<div style={{ position: "absolute", fontFamily: "Jalnan", fontSize: "20px", bottom: "5%" }}>{nickname}</div>
		</>
);
};

export default TogetherLocalStreamComponent;