import React, { Component } from 'react';
// import './StreamComponent.css';
import OvVideoComponent from './OvVideo';

import MicOff from '@material-ui/icons/MicOff';
import VideocamOff from '@material-ui/icons/VideocamOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import HighlightOff from '@material-ui/icons/HighlightOff';
import FormHelperText from '@material-ui/core/FormHelperText';
import HostVideoComponent from './HostVideo';

export default class HostComponent extends Component {
	constructor(props) {
			super(props);
			this.state = { nickname: this.props.user.getNickname(), showForm: false, mutedSound: false, isFormValid: true };
			this.handleChange = this.handleChange.bind(this);
			this.handlePressKey = this.handlePressKey.bind(this);
			this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
			this.toggleSound = this.toggleSound.bind(this);
	}

	handleChange(event) {
			this.setState({ nickname: event.target.value });
			event.preventDefault();
	}

	toggleNicknameForm() {
			if (this.props.user.isLocal()) {
					this.setState({ showForm: !this.state.showForm });
			}
	}

	toggleSound() {
			this.setState({ mutedSound: !this.state.mutedSound });
	}

	handlePressKey(event) {
			if (event.key === 'Enter') {
					console.log(this.state.nickname);
					if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
							this.props.handleNickname(this.state.nickname);
							this.toggleNicknameForm();
							this.setState({ isFormValid: true });
					} else {
							this.setState({ isFormValid: false });
					}
			}
	}

	render() {
		console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",this.props.user)
			return (
        <div className="host">
          <HostVideoComponent user={this.props.user} mutedSound={this.state.mutedSound}/>
        </div>
		);
	}
}
