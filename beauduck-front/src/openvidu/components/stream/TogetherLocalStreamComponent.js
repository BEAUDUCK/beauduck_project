import React, { useState } from 'react';
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

	console.log(props)
	// const toggleSound = () => {
	// 	setMutedSound(!mutedSound)
	// }

	console.log(nickname)
	return (
		<>
			<div className="streamComponent" style={{ display: "flex", justifyContent: "", alignItems: "center" }} >
					<TogetherLocalOvVideoComponent user={props.user} mutedSound={mutedSound} />
			</div>
			<div style={{ position: "absolute", fontFamily: "Jalnan", fontSize: "20px", bottom: "5%" }}>{nickname}</div>
		</>
);
};

export default TogetherLocalStreamComponent;