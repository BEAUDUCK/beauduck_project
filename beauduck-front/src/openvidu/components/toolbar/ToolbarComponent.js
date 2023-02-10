import React, { Component } from 'react';
// import './ToolbarComponent.css';

// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';

import Mic from '@mui/icons-material/Mic';
import MicOff from '@mui/icons-material/MicOff';
import Videocam from '@mui/icons-material/Videocam';
import VideocamOff from '@mui/icons-material/VideocamOff';
// import Fullscreen from '@material-ui/icons/Fullscreen';
// import FullscreenExit from '@material-ui/icons/FullscreenExit';
// import SwitchVideoIcon from '@material-ui/icons/SwitchVideo';
// import PictureInPicture from '@material-ui/icons/PictureInPicture';
// import ScreenShare from '@material-ui/icons/ScreenShare';
// import StopScreenShare from '@material-ui/icons/StopScreenShare';
// import Tooltip from '@material-ui/core/Tooltip';
// import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
// import QuestionAnswer from '@material-ui/icons/QuestionAnswer';

import IconButton from '@mui/material/IconButton';

const logo = require('../../assets/images/openvidu_logo.png');

export default class ToolbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { fullscreen: false };
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
    }


    micStatusChanged() {
        this.props.micStatusChanged();
    }

    camStatusChanged() {
        this.props.camStatusChanged();
    }

    screenShare() {
        this.props.screenShare();
    }

    stopScreenShare() {
        this.props.stopScreenShare();
    }

    toggleFullscreen() {
        this.setState({ fullscreen: !this.state.fullscreen });
        this.props.toggleFullscreen();
    }

    switchCamera() {
        this.props.switchCamera();
    }

    leaveSession() {
        this.props.leaveSession();
    }

    toggleChat() {
        this.props.toggleChat();
    }

    render() {
        const mySessionId = this.props.sessionId;
        const localUser = this.props.user;
        return (
            <div className="toolbar" style={{ width: "300px", minWidth: "none" }} >
                    <div id="navSessionInfo">

                        {/* 로고 이미지 */}
                        {/* <img
                            id="header_img"
                            alt="OpenVidu Logo"
                            src={logo}
                        /> */}

                        {/* 세션 이름 */}
                        {/* {this.props.sessionId && <div id="titleContent">
                            <span id="session-title">{mySessionId}</span>
                        </div>} */}
                    </div>

                    <div className="buttonsContent">
                        {/* 마이크 ON/OFF 아이콘 */}
                        <IconButton color="inherit" className="navButton" id="navMicButton" onClick={this.micStatusChanged}>
                            {localUser !== undefined && localUser.isAudioActive() ? <Mic /> : <MicOff color="secondary" />}
                        </IconButton>

                        {/* 캠 ON/OFF 아이콘 */}
                        <IconButton color="inherit" className="navButton" id="navCamButton" onClick={this.camStatusChanged}>
                            {localUser !== undefined && localUser.isVideoActive() ? (
                                <Videocam />
                            ) : (
                                <VideocamOff color="secondary" />
                            )}
                        </IconButton>
                        
                        {/* 화면공유 아이콘 */}
                        {/* <IconButton color="inherit" className="navButton" onClick={this.screenShare}>
                            {localUser !== undefined && localUser.isScreenShareActive() ? <PictureInPicture /> : <ScreenShare />}
                        </IconButton>

                        {localUser !== undefined &&
                            localUser.isScreenShareActive() && (
                                <IconButton onClick={this.stopScreenShare} id="navScreenButton">
                                    <StopScreenShare color="secondary" />
                                </IconButton>
                            )} */}

                        {/* 비디오 바꾸는 아이콘 */}
                        {/* <IconButton color="inherit" className="navButton" onClick={this.switchCamera}>
                            <SwitchVideoIcon />
                        </IconButton> */}
                        
                        {/* 전체화면 아이콘 */}
                        {/* <IconButton color="inherit" className="navButton" onClick={this.toggleFullscreen}>
                            {localUser !== undefined && this.state.fullscreen ? <FullscreenExit /> : <Fullscreen />}
                        </IconButton> */}

                        {/* 나가기 아이콘 */}
                        {/* <IconButton color="secondary" className="navButton" onClick={this.leaveSession} id="navLeaveButton">
                            <PowerSettingsNew />
                        </IconButton> */}

                        {/* 채팅 아이콘 */}
                        {/* <IconButton color="inherit" onClick={this.toggleChat} id="navChatButton">
                            {this.props.showNotification && <div id="point" className="" />}
                            <Tooltip title="Chat">
                                <QuestionAnswer />
                            </Tooltip>
                        </IconButton> */}
                    </div>

            </div>
        );
    }
}
