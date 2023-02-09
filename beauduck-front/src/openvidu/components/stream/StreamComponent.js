import React, { Component, useState } from 'react';
// import './StreamComponent.css';
import OvVideoComponent from './OvVideo';

// import MicOff from '@material-ui/icons/MicOff';
// import VideocamOff from '@material-ui/icons/VideocamOff';
// import VolumeUp from '@material-ui/icons/VolumeUp';
// import VolumeOff from '@material-ui/icons/VolumeOff';
// import FormControl from '@material-ui/core/FormControl';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import IconButton from '@material-ui/core/IconButton';
// import HighlightOff from '@material-ui/icons/HighlightOff';
// import FormHelperText from '@material-ui/core/FormHelperText';

const StreamComponent = (props) => {
	const nickname = props.user.nickname
	const [showForm, setShowForm] = useState(false)
	const [mutedSound, setMutedSound] = useState(false)
	const [isFormValid, setIsFormValid] = useState(true)

	const toggleSound = () => {
		setMutedSound(!mutedSound)
	}

	return (
		<div className="consultant-list">
			<div className='nickname'>
				{this.state.nickname}
			</div>
				

		{this.props.user !== undefined && this.props.user.getStreamManager() !== undefined ? (
			<div className="streamComponent" >
				<OvVideoComponent user={this.props.user} mutedSound={this.state.mutedSound} />
			</div>
		) : null}
		</div>
	);
};

export default StreamComponent;