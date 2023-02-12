import React, { Component, useState } from 'react';
import './StreamComponent.css';
import OvVideoComponent from './OvVideo';

import MicOff from '@mui/icons-material/MicOff';
import VideocamOff from '@mui/icons-material/VideocamOff';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOff from '@mui/icons-material/VolumeOff';
// import FormControl from '@mui/core/FormControl';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import IconButton from '@material-ui/core/IconButton';
import HighlightOff from '@mui/icons-material/HighlightOff';
// import FormHelperText from '@material-ui/core/FormHelperText';

const StreamComponent = (props) => {
	console.log("", props)
	const [showForm, setShowForm] = useState(false)
	const [mutedSound, setMutedSound] = useState(false)
	const [isFormValid, setIsFormValid] = useState(true)

	const toggleSound = () => {
		setMutedSound(!mutedSound)
	}

	return (
		<div className="OT_widget-container">
				<div className="streamComponent">
						<OvVideoComponent user={props.user} mutedSound={mutedSound} />
				</div>
		</div>
);
};

export default StreamComponent;