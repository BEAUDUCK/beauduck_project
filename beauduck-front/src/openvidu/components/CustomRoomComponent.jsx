import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
// import ChatComponent from './chat/ChatComponent';
// import DialogExtensionComponent from './dialog-extension/DialogExtension';
import StreamComponent from './stream/StreamComponent';
// import './VideoRoomComponent.css';

import OpenViduLayout from '../layout/openvidu-layout';
import UserModel from '../models/user-model';
import HostComponent from './stream/HostComponent';
import ToolbarComponent from './toolbar/ToolbarComponent';
import RestTime from './RestTime';
import Message from './Message';
import AnswerComponent from './AnswerComponent';
import SmallConsultantStream from './stream/SmallConsultantStream';
// import ToolbarComponent from './toolbar/ToolbarComponent';


var localUser = new UserModel();
// const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'localhost:5000/';
const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://i8b306.p.ssafy.io:9000/'

class CustomRoomComponent extends Component {
    constructor(props) {
        super(props);
        this.hasBeenUpdated = false;
        this.layout = new OpenViduLayout();
        let sessionName = this.props.sessionName ? this.props.sessionName : 'SessionA';
        let userName = this.props.user ? this.props.user : 'OpenVidu_User' + Math.floor(Math.random() * 100);
        this.remotes = [];
        this.localUserAccessAllowed = false;
        this.state = {
            mySessionId: sessionName,
            myUserName: userName,
            session: undefined,
            localUser: undefined,
            subscribers: [],
            chatDisplay: 'none',
            currentVideoDevice: undefined,
        };
        // 메서드 바인딩 과정
        // joinSession : 세션 접속
        this.joinSession = this.joinSession.bind(this);

        // leaveSession : 세션 접속 해제
        this.leaveSession = this.leaveSession.bind(this);

        // onbeforeunload : 접속 종료 전에 일어나는 일들을 처리하는 함수
        this.onbeforeunload = this.onbeforeunload.bind(this);

        // updateLayout: 레이아웃 업데이트
        this.updateLayout = this.updateLayout.bind(this);

        // camStatusChanged: 캠 상태 변경 함수
        this.camStatusChanged = this.camStatusChanged.bind(this);

        // micStatusChanged: 마이크 상태 변경 함수
        this.micStatusChanged = this.micStatusChanged.bind(this);

        // nicknameChanged : 닉네임 바꼈을때? 아마 필요 없는 함수일듯
        this.nicknameChanged = this.nicknameChanged.bind(this);
        
        // toggleFullscreen : 전체화면 함수인듯
        this.toggleFullscreen = this.toggleFullscreen.bind(this);

        // switchCamera : 카메라 바꾸는 함수
        this.switchCamera = this.switchCamera.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.closeDialogExtension = this.closeDialogExtension.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        // checkNotification: 알림 확인 함수
        this.checkNotification = this.checkNotification.bind(this);
        this.checkSize = this.checkSize.bind(this);
    }
    // componentDidMount: 컴포넌트가 마운트 되었을 때 작동하는 리액트 컴포넌트 생명주기함수
    componentDidMount() {
        // openViduLayoutOptions: 화면 레이아웃 설정
        const openViduLayoutOptions = {
            maxRatio: 9 / 16, // The narrowest ratio that will be used (default 2x3)
            minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
            fixedRatio: true, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
            bigClass: 'OV_big', // The class to add to elements that should be sized bigger
            bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
            bigFixedRatio: false, // fixedRatio for the big ones
            bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
            bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
            bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
            animate: true, // Whether you want to animate the transitions
        };
         // 초기 화면 설정
        this.layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);

        // 화면 크기 변경 및 종료시 발생하는 이벤트핸들러 달아두기
        window.addEventListener('beforeunload', this.onbeforeunload);
        window.addEventListener('resize', this.updateLayout);
        window.addEventListener('resize', this.checkSize);

         // 세션에 조인하기
        this.joinSession();
    }
    // componentWillUnmount: 컴포넌트가 언마운트 됐을 때 작동하는 리액트 컴포넌트 생명주기함수
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        window.removeEventListener('resize', this.updateLayout);
        window.removeEventListener('resize', this.checkSize);
        this.leaveSession();
    }

    // onbeforeunload : 페이지를 떠나기 직전에 작동하는 함수
    onbeforeunload(event) {
        this.leaveSession();
    }

    // joinSession : 세션에 접속할 때 작동하는 함수
    joinSession() {
        this.OV = new OpenVidu();

        // setState : 1st 매개변수 - 상태값 설정, 2nd 매개변수 - 콜백함수
        this.setState({ session: this.OV.initSession(), }, async () => {
                this.subscribeToStreamCreated();
                await this.connectToSession();
            },
        );
    }


    // connectToSession: 세션 연결을 위한 토큰을 받아서 연결을 처리하는 함수
    async connectToSession() {
        if (this.props.token !== undefined) {
            // console.log('token received: ', this.props.token);
            this.connect(this.props.token);
        } else {
            try {
                var token = await this.getToken();
                this.connect(token);
            } catch (error) {
                console.log("@@@@@@@@@@@에러 남")
                console.error('There was an error getting the token:', error.code, error.message);
                if(this.props.error){
                    this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
                }
                alert('There was an error getting the token:', error.message);
            }
        }
    }

    // connect : 토큰을 매개변수로 받아서 실제 세션에 접속하게 해주는 함수
    connect(token) {
        console.log(token)
        this.state.session
            .connect(
                token,
                { clientData: this.state.myUserName },
            )
            .then(() => {
                this.connectWebCam();
            })
            .catch((error) => {
                if(this.props.error){
                    this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
                }
                alert('There was an error connecting to the session:', error.message);
                console.log('There was an error connecting to the session:', error.code, error.message);
            });
    }

    // connectWebCam : 웹캠을 연결하는 함수 (실제 WebRTC와 연관된 내부 메서드들과 유사)
    async connectWebCam() {
        await this.OV.getUserMedia({ audioSource: undefined, videoSource: undefined });
        var devices = await this.OV.getDevices();
        var videoDevices = devices.filter(device => device.kind === 'videoinput');

        // publisher 초기설정(자기자신)
        let publisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: videoDevices[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            resolution: '1280x720',
            frameRate: 30,
            insertMode: 'APPEND',
        });

        // 접근이 허용되었을 때 설정 변경
        if (this.state.session.capabilities.publish) {
            publisher.on('accessAllowed' , () => {
                this.state.session.publish(publisher).then(() => {
                    this.updateSubscribers();
                    this.localUserAccessAllowed = true;
                    if (this.props.joinSession) {
                        this.props.joinSession();
                    }
                });
            });

        }

        // 로컬 유저(자신)의 정보 및 환경설정
        localUser.setNickname(this.state.myUserName);
        localUser.setConnectionId(this.state.session.connection.connectionId);
        localUser.setScreenShareActive(false);
        localUser.setStreamManager(publisher);
        this.subscribeToUserChanged();
        this.subscribeToStreamDestroyed();
        this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });

        this.setState({ currentVideoDevice: videoDevices[0], localUser: localUser }, () => {
            this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
                this.updateLayout();
                publisher.videos[0].video.parentElement.classList.remove('custom-class');
            });
        });
    }

    // updateSubscribers : 자신의 정보를 구독하고 있는(받고 있는) 유저들의 정보를 업데이트
    updateSubscribers() {
        var subscribers = this.remotes;
        this.setState(
            {
                subscribers: subscribers,
            },
            () => {
                if (this.state.localUser) {
                    this.sendSignalUserChanged({
                        isAudioActive: this.state.localUser.isAudioActive(),
                        isVideoActive: this.state.localUser.isVideoActive(),
                        nickname: this.state.localUser.getNickname(),
                        isScreenShareActive: this.state.localUser.isScreenShareActive(),
                    });
                }
                this.updateLayout();
            },
        );
    }

    leaveSession() {
        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        // 모든 설정 초기화
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'OpenVidu_User' + Math.floor(Math.random() * 100),
            localUser: undefined,
        });
        if (this.props.leaveSession) {
            this.props.leaveSession();
        }
    }

    // camStatusChanged : 캠 설정 변경
    camStatusChanged() {
        localUser.setVideoActive(!localUser.isVideoActive());
        localUser.getStreamManager().publishVideo(localUser.isVideoActive());
        this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
        this.setState({ localUser: localUser });
    }

    // micStatusChanged : 마이크 설정 변경
    micStatusChanged() {
        localUser.setAudioActive(!localUser.isAudioActive());
        localUser.getStreamManager().publishAudio(localUser.isAudioActive());
        this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
        this.setState({ localUser: localUser });
    }

    nicknameChanged(nickname) {
        let localUser = this.state.localUser;
        localUser.setNickname(nickname);
        this.setState({ localUser: localUser });
        this.sendSignalUserChanged({ nickname: this.state.localUser.getNickname() });
    }
    
    // deleteSubscriber : 매개 변수로 받은 stream을 가진 유저를 구독자 명단에서 제거하는 함수
    deleteSubscriber(stream) {
        const remoteUsers = this.state.subscribers;
        const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
        let index = remoteUsers.indexOf(userStream, 0);
        if (index > -1) {
            remoteUsers.splice(index, 1);
            this.setState({
                subscribers: remoteUsers,
            });
        }
    }

    // subscribeToStreamCreated : 새롭게 접속한 사람의 스트림을 구독하는 함수
    subscribeToStreamCreated() {
        this.state.session.on('streamCreated', (event) => {
            const subscriber = this.state.session.subscribe(event.stream, undefined);
            // var subscribers = this.state.subscribers;
            subscriber.on('streamPlaying', (e) => {
                this.checkSomeoneShareScreen();
                subscriber.videos[0].video.parentElement.classList.remove('custom-class');
            });

            // 새로운 유저 껍데기를 만들어서 거기에 이벤트를 받은 stream 정보를 넣ㅇ느 후에 내 remotes 에 등록
            const newUser = new UserModel();
            newUser.setStreamManager(subscriber);
            newUser.setConnectionId(event.stream.connection.connectionId);
            newUser.setType('remote');
            const nickname = event.stream.connection.data.split('%')[0];
            newUser.setNickname(JSON.parse(nickname).clientData);
            this.remotes.push(newUser);
            if(this.localUserAccessAllowed) {
                this.updateSubscribers();
            }
        });
    }

    // subscribeToStreamDestroyed : streamDestroyed 이벤트가 들어왔을 때 해당하는 stream 요소를 구독 목록에서 제거하는 함수 
    subscribeToStreamDestroyed() {
        // On every Stream destroyed...
        this.state.session.on('streamDestroyed', (event) => {
            // Remove the stream from 'subscribers' array
            this.deleteSubscriber(event.stream);
            setTimeout(() => {
                this.checkSomeoneShareScreen();
            }, 20);
            event.preventDefault();
            this.updateLayout();
        });
    }

    // subscribeToUserChanged : 구독한 유저중에 닉네임, 비디오, 오디오, 화면공유, 포인트 상태가 변경되었을 때 감지해서 화면을 바꿔주는 함수
    subscribeToUserChanged() {
        this.state.session.on('signal:userChanged', (event) => {
            let remoteUsers = this.state.subscribers;
            remoteUsers.forEach((user) => {
                if (user.getConnectionId() === event.from.connectionId) {
                    const data = JSON.parse(event.data);
                    console.log('EVENTO REMOTE: ', event.data);
                    if (data.isAudioActive !== undefined) {
                        user.setAudioActive(data.isAudioActive);
                    }
                    if (data.isVideoActive !== undefined) {
                        user.setVideoActive(data.isVideoActive);
                    }
                    if (data.nickname !== undefined) {
                        user.setNickname(data.nickname);
                    }
                    if (data.isScreenShareActive !== undefined) {
                        user.setScreenShareActive(data.isScreenShareActive);
                    }
                }
            });
            this.setState(
                {
                    subscribers: remoteUsers,
                },
                () => this.checkSomeoneShareScreen(),
            );
        });
    }

    // updateLayout : 레이아웃을 업데이트 하는 함수
    updateLayout() {
        setTimeout(() => {
            this.layout.updateLayout();
        }, 20);
    }

    // sendSignalUserChanged : 유저 정보가 변경되었음을 알려주는 함수
    sendSignalUserChanged(data) {
        const signalOptions = {
            data: JSON.stringify(data),
            type: 'userChanged',
        };
        this.state.session.signal(signalOptions);
    }

    // toggleFullscreen : 전체 화면을 토글하는 함수
    toggleFullscreen() {
        const document = window.document;
        const fs = document.getElementById('container');
        if (
            !document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement
        ) {
            if (fs.requestFullscreen) {
                fs.requestFullscreen();
            } else if (fs.msRequestFullscreen) {
                fs.msRequestFullscreen();
            } else if (fs.mozRequestFullScreen) {
                fs.mozRequestFullScreen();
            } else if (fs.webkitRequestFullscreen) {
                fs.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    async switchCamera() {
        try{
            const devices = await this.OV.getDevices()
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if(videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {
                    // Creating a new publisher with specific videoSource
                    // In mobile devices the default and first camera is the front one
                    var newPublisher = this.OV.initPublisher(undefined, {
                        audioSource: undefined,
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: localUser.isAudioActive(),
                        publishVideo: localUser.isVideoActive(),
                        mirror: true
                    });

                    //newPublisher.once("accessAllowed", () => {
                    await this.state.session.unpublish(this.state.localUser.getStreamManager());
                    await this.state.session.publish(newPublisher)
                    this.state.localUser.setStreamManager(newPublisher);
                    this.setState({
                        currentVideoDevice: newVideoDevice,
                        localUser: localUser,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    // screenShare : 화면 공유를 도와주는 함수
    // 아마 화공은 안쓸듯
    screenShare() {
        const videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';

        // 화면 공유를 하는 사람의 상태 확인
        const publisher = this.OV.initPublisher(
            undefined,
            {
                videoSource: videoSource,
                publishAudio: localUser.isAudioActive(),
                publishVideo: localUser.isVideoActive(),
                mirror: false,
            },
            (error) => {
                if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
                    this.setState({ showExtensionDialog: true });
                } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
                    alert('Your browser does not support screen sharing');
                } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
                    alert('You need to enable screen sharing extension');
                } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
                    alert('You need to choose a window or application to share');
                }
            },
        );

        // 접근 허용이 되어 있다면 화면공유를 하기 위한 상태값 변경
        publisher.once('accessAllowed', () => {
            this.state.session.unpublish(localUser.getStreamManager());
            localUser.setStreamManager(publisher);
            this.state.session.publish(localUser.getStreamManager()).then(() => {
                localUser.setScreenShareActive(true);
                this.setState({ localUser: localUser }, () => {
                    this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });
                });
            });
        });

        // 다른 사람의 streamPlaying이 발생했을 때 내 화면을 다시 초기화
        publisher.on('streamPlaying', () => {
            this.updateLayout();
            publisher.videos[0].video.parentElement.classList.remove('custom-class');
        });
    }

    // closeDialogExtension : 다이얼로그창 닫기 함수
    closeDialogExtension() {
        this.setState({ showExtensionDialog: false });
    }

    // stopScreenShare : 화면공유 중지 함수
    stopScreenShare() {
        this.state.session.unpublish(localUser.getStreamManager());
        this.connectWebCam();
    }

    // checkSomeoneShareScreen : 다른 사람이 스크린쉐어를 하고 있는지 확인
    checkSomeoneShareScreen() {
        let isScreenShared;
        // return true if at least one passes the test
        isScreenShared = this.state.subscribers.some((user) => user.isScreenShareActive()) || localUser.isScreenShareActive();
        const openviduLayoutOptions = {
            maxRatio: 3 / 2,
            minRatio: 9 / 16,
            fixedRatio: isScreenShared,
            bigClass: 'OV_big',
            bigPercentage: 0.8,
            bigFixedRatio: false,
            bigMaxRatio: 3 / 2,
            bigMinRatio: 9 / 16,
            bigFirst: true,
            animate: true,
        };
        this.layout.setLayoutOptions(openviduLayoutOptions);
        this.updateLayout();
    }

      // toggleChat: 채팅 토글 버튼, none면 채팅창 꺼짐, block이면 채팅창 켜짐
    toggleChat(property) {
        let display = property;

        if (display === undefined) {
            display = this.state.chatDisplay === 'none' ? 'block' : 'none';
        }
        if (display === 'block') {
            this.setState({ chatDisplay: display, messageReceived: false });
        } else {
            console.log('chat', display);
            this.setState({ chatDisplay: display });
        }
        this.updateLayout();
    }

    // checkNotification: 채팅 안내 확인
    checkNotification(event) {
        this.setState({
            messageReceived: this.state.chatDisplay === 'none',
        });
    }

    // checkSize: 반응형 채팅창을 위한 사이즈체크
    checkSize() {
        if (document.getElementById('layout').offsetWidth <= 700 && !this.hasBeenUpdated) {
            this.toggleChat('none');
            this.hasBeenUpdated = true;
        }
        if (document.getElementById('layout').offsetWidth > 700 && this.hasBeenUpdated) {
          this.hasBeenUpdated = false;
        }
    }
    
    render() {
        const mySessionId = this.state.mySessionId;
        const localUser = this.state.localUser;
        const chatDisplay = { display: this.state.chatDisplay };
        const host = this.props.host
        const userCount = this.state.subscribers.length + 1
        // const userList = this.props.userList
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",localUser)
        return (
          <>
            {host === localUser ? (
              // 내가 호스트 일때 
              <div className="container" id="container" style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "space-evenly" }}>
                  <div className="left-div" style={{ width: "20%", height: "100%" }} >
                      {this.state.subscribers.slice(0, 5).map((sub, i) => (
                          <div key={i} className="consultant-1" style={{ height: "20%", display: "flex",justifyContent: "center", alignItems: "center" }}>
                            <StreamComponent user={sub} streamId={sub.streamManager.stream.streamId} />
                          </div>
                      ))}
                  </div>
                  <div className='host-div' style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }} >
                    {/* {host === this.state.myUserName && 
                      <div>
                        <HostComponent user={sub} streamId={sub.streamManager.stream.streamId}/>
                      </div>
                    } */}
                    <div className='room-title' style={{ height: "5vh" }}>
                      {`${host}의 방`}
                    </div>
                    {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                      <div className="host" style={{ height: "70vh" }}>
                        <HostComponent user={localUser} handleNickname={this.nicknameChanged}/>
                      </div>
                      )}
                    <div className='sub' style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "15vh" }}>
                      <RestTime />
                      <ToolbarComponent
                        sessionId={mySessionId}
                        user={localUser}
                        showNotification={this.state.messageReceived}
                        camStatusChanged={this.camStatusChanged}
                        micStatusChanged={this.micStatusChanged}
                      />
                      <Message />
                    </div>
                  </div>
                  <div className='right-div' style={{ width: "20%", height: "100%" }}>
                    {this.state.subscribers.slice(5, 10).map((sub, i) => (
                      <div key={i} className="consultant-2" style={{ height: "20%", display: "flex",justifyContent: "center", alignItems: "center" }}>
                        <StreamComponent user={sub} streamId={sub.streamManager.stream.streamId} />
                      </div>
                    ))}
                  </div>
              </div>
            ) : (
              // 내가 컨설턴트 일 때
              <div className="container" id="container" style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "space-evenly" }}>
              <div className="left-div" style={{ width: "20%", height: "100%" }} >
                <RestTime />
              </div>
              <div className='host-div' style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }} >

                <div className='room-title' style={{ height: "5vh" }}>
                  {`${host}의 방`}
                </div>
                {/* 일단 퍼블리셔를 호스트로 */}
                {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                  <div className="host" style={{ height: "70vh" }}>
                    <HostComponent user={localUser} handleNickname={this.nicknameChanged}/>
                  </div>
                  )}
                <div className='sub' style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100%", height: "25vh" }}>
                {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                  <div className="consultant-small" style={{ width: "50%", height: "100%" }} >
                    <SmallConsultantStream user={localUser} handleNickname={this.nicknameChanged}/>
                  </div>
                  )}
                  <AnswerComponent
                    user={localUser}
                    userCount={userCount}
                    // userList={userList}
                  />
                </div>
              </div>
              <div className='right-div' style={{ width: "20%", height: "100%" }}>
                  <Message />
              </div>
          </div>
          )
            }
          </>
      )
      }

    /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The methods below request the creation of a Session and a Token to
     * your application server. This keeps your OpenVidu deployment secure.
     *
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints! In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     *
     * Visit https://docs.openvidu.io/en/stable/application-server to learn
     * more about the integration of OpenVidu in your application server.
     */
    async getToken() {
        const sessionId = await this.createSession(this.state.mySessionId);
        return await this.createToken(sessionId);
    }

    async createSession(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json', },
        });
        this.state.host = this.state.myUserName
        return response.data; // The sessionId
    }

    async createToken(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The token
    }
}
export default CustomRoomComponent;