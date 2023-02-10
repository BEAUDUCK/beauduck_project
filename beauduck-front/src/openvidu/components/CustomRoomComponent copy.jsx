import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OPENVIDU_SERVER_URL = "https://i8b306.p.ssafy.io:9000/"

const CustomRoomComponent = () => {
	const navigate = useNavigate();
	// 유저 정보, 이메일, role 불러와야함
	const { nickname, email, role } = useRecoilValue(userAtom);
	const [session, setSession] = useState(undefined);
	const [user, setUser] = useState(undefined);
	const [hostSessionName, setHostSessionName] = useState('호스트이름');
	const [mySessionId, setMySessionId] = useState(
		role === 'HOST' ? tmp : hostSessionName,
	);
	const [myUserName, setMyUserName] = useState(nickname);
	const [publisher, setPublisher] = useState(undefined);
	const [host, setHost] = useState(undefined);
	const [OV, setOV] = useState(null);
	
	useEffect(() => {
		window.addEventListener('beforeunload', onbeforeunload);
		return () => {
			window.removeEventListener('beforeunload', onbeforeunload);
		};
	}, []);

	useEffect(() => {
		if (role === 'user') {
			if (!hostSessionName) {
				alert('요청된 세션이 없습니다. 종료 후 정상접근 해주세요.');
			} else {
				console.log(hostSessionName);
			}
		}
	}, [hostSessionName]);

	useEffect(() => {
		if (session) {
			session.on('streamCreated', streamCreated);
			session.on('streamDestroyed', streamDestroyed);
			session.on('exception', exception);
			getToken().then(sessionConnect);
		}
	}, [session]);

	const sessionConnect = token => {
		session
			.connect(token, { clientData: myUserName, clientRole: role })
			.then(() => {
				let publisher = OV.initPublisher(undefined, {
					audioSource: undefined,
					videoSource: undefined,
					publishAudio: true,
					publishVideo: true,
					resolution: '1280x960',
					frameRate: 30,
					insertMode: 'APPEND',
					mirror: false,
				});
				publisher.subscribeToRemote();
				session.publish(publisher);
				setPublisher(publisher);
				if (role === 'USER') {
					setUser(publisher);
				}
				if (role === 'HOST') {
					setHost(publisher);
				}
			})
			.catch(error => {});
	};

	const switchCamera = () => {
		OV.getDevices().then(devices => {
			var videoDevices = devices.filter(device => device.kind === 'videoinput');
			console.log(videoDevices);
			if (videoDevices && videoDevices.length > 1) {
				var newPublisher = OV.initPublisher(undefined, {
					videoSource: isFrontCamera
						? videoDevices[1].deviceId
						: videoDevices[0].deviceId,
					publishAudio: true,
					publishVideo: true,
					mirror: isFrontCamera,
				});

				setIsFrontCamera(!isFrontCamera);

				session.unpublish(publisher).then(() => {
					console.log('Old publisher unpublished!');

					setPublisher(newPublisher);
					session.publish(publisher).then(() => {
						console.log('New publisher published!');
					});
				});
			}
		});
	};

	const onbeforeunload = () => {
		leaveSession();
	};

	const deleteSubscriber = streamManager => {};

	const joinSession = () => {
		const getOV = new OpenVidu();

		setSession(getOV.initSession());

		setOV(getOV);

		// console.log(OV);
	};

	const streamCreated = event => {
		const subscriber = session.subscribe(event.stream, undefined);
		const subRole = JSON.parse(event.stream.connection.data).clientRole;
		if (role === 'HOST' && subRole === 'USER') {
			setUser(subscriber);
		} else if (role === 'USER' && subRole === 'HOST') {
			setHost(subscriber);
		}
	};

	const streamDestroyed = event => {
		deleteSubscriber(event.stream.streamManager);
	};

	const exception = exception => {
		console.warn(exception);
	};

	const handleChangeUserName = e => {
		setMyUserName(e.target.value);
	};

	const handleChangeSessionId = e => {
		setMySessionId(e.target.value);
	};

	const leaveSession = () => {
		if (role === 'HOST') {
			if (session) {
				session.disconnect();
				navigate('/');
			}
		}
		if (role === 'USER' && session) {
			session.disconnect();
		}
		setOV(null);
		setMySessionId(role === 'HOST' ? tmp : hostSessionName);
		setSession(undefined);
		setUser(undefined);
		setMyUserName(nickname);
		setHost(undefined);
	};

	const getToken = () => {
		return createSession(mySessionId).then(sessionId => createToken(sessionId));
	};

	const createSession = sessionId => {
		return new Promise((resolve, reject) => {
			const data = JSON.stringify({ customSessionId: sessionId });
			axios
				.post(APPLICATION_SERVER_URL + '/sessions', data, {
					headers: {
						// Authorization:
						// 'Basic ' + btoa('OPENVIDUAPP:' + APPLICATION_SERVER_URL),
						'Content-Type': 'application/json',
						// 'Access-Control-Allow-Origin': '*',
						// 'Access-Control-Allow-Methods': 'GET,POST',
					},
				})
				.then(response => {
					resolve(response.data);
				})
				.catch(response => {
					var error = Object.assign({}, response);
					if (error?.response?.status === 409) {
						resolve(sessionId);
					} else {
						console.warn(
							'No connection to OpenVidu Server. This may be a certificate error at ' +
								APPLICATION_SERVER_URL,
						);
						if (
							window.confirm(
								'No connection to OpenVidu Server. This may be a certificate error at "' +
									APPLICATION_SERVER_URL +
									'"\n\nClick OK to navigate and accept it. ' +
									'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
									APPLICATION_SERVER_URL +
									'"',
							)
						) {
							window.location.assign(
								APPLICATION_SERVER_URL + '/accept-certificate',
							);
						}
					}
				});
		});
	};

	const createToken = sessionId => {
		return new Promise((resolve, reject) => {
			const data = {
				type: 'WEBRTC',
				role: 'PUBLISHER',
				kurentoOptions: {
					videoMaxRecvBandwidth: 1000,
					videoMinRecvBandwidth: 300,
					videoMaxSendBandwidth: 1000,
					videoMinSendBandwidth: 300,
					allowedFilters: [
						'GStreamerFilter',
						'FaceOverlayFilter',
						'ChromaFilter',
					],
				},
			};
			axios
				.post(
					APPLICATION_SERVER_URL + '/sessions/' + sessionId + '/connections',
					data,
					{
						headers: { 'Content-Type': 'application/json' },
					},
				)
				.then(response => {
					console.log(response.data);
					resolve(response.data);
				})
				.catch(error => reject(error));
		});
	};

	return (
		<>
		</>
	)
};


export default CustomRoomComponent;