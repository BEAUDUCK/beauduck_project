import React, { Component } from 'react';
import './StreamComponent.css';
import OvVideoComponent from './OvVideo';

import MicOff from '@mui/icons-material/MicOff';
import VideocamOff from '@mui/icons-material/VideocamOff';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOff from '@mui/icons-material/VolumeOff';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import HighlightOff from '@mui/icons-material/HighlightOff';
import FormHelperText from '@mui/material/FormHelperText';
import { Timer } from '@mui/icons-material';
import Photos from '../photos/Photos';

// 스트림된 요소들을 컨트롤하는 요소들을 담은 컴포넌트
export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
      //   isActive: this.props.isActive,
      //   nowIdx: this.props.nowIdx,
    };
    // this.changeIdx = this.props.changeIdx.bind(this);
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

  // 사운드 ON/OFF 버튼 함수
  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  // 키를 눌렀을 때 동작하는 이벤트핸들러
  handlePressKey(event) {
    if (event.key === 'Enter') {
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
    return (
      <div className="OT_widget-container" style={{ marginTop: '20px' }}>
        {/* 닉네임 보여주는 div */}
        <div className="pointer nickname">
          {this.state.showForm ? (
            <FormControl id="nicknameForm">
              <IconButton
                color="inherit"
                id="closeButton"
                onClick={this.toggleNicknameForm}
              >
                <HighlightOff />
              </IconButton>
              <InputLabel htmlFor="name-simple" id="label">
                Nickname
              </InputLabel>
              <Input
                color="inherit"
                id="input"
                value={this.state.nickname}
                onChange={this.handleChange}
                onKeyPress={this.handlePressKey}
                required
              />
              {!this.state.isFormValid && this.state.nickname.length <= 3 && (
                <FormHelperText id="name-error-text">
                  Nickname is too short!
                </FormHelperText>
              )}
              {!this.state.isFormValid && this.state.nickname.length >= 20 && (
                <FormHelperText id="name-error-text">
                  Nickname is too long!
                </FormHelperText>
              )}
            </FormControl>
          ) : (
            // 이부분이 표시 -> Publisher(나 자신) edit 표시
            <div onClick={this.toggleNicknameForm}>
              <span id="nickname">{this.props.user.getNickname()}</span>
              {this.props.user.isLocal() && <span id=""> (edit)</span>}
            </div>
          )}
        </div>
        {/* 실제 영상 출력 부분 */}
        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            {/* {this.isActive && <Timer changeIdx={this.changeIdx} />} */}
            {/* {this.isActive && <Photos nowIdx={this.nowIdx} />} */}
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
              nowPhoto={this.props.nowPhoto}
            />
            <div id="statusIcons">
              {!this.props.user.isVideoActive() ? (
                <div id="camIcon">
                  <VideocamOff id="statusCam" />
                </div>
              ) : null}

              {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <MicOff id="statusMic" />
                </div>
              ) : null}
            </div>
            <div>
              {!this.props.user.isLocal() && (
                <IconButton id="volumeButton" onClick={this.toggleSound}>
                  {this.state.mutedSound ? (
                    <VolumeOff color="secondary" />
                  ) : (
                    <VolumeUp />
                  )}
                </IconButton>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
