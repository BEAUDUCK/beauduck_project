import React, { Component, useState } from 'react';
// import './StreamComponent.css';
// import OvVideoComponent from './OvVideo';

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
import HostVideoComponent from './HostVideo';
import AnswerComponent from '../AnswerComponent';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HostComponent = (props) => {
	console.log(props)

	// const [showForm, setShowForm] = useState(false)
	const [mutedSound, setMutedSound] = useState(false)
	// const [isFormValid, setIsFormValid] = useState(true)
	const image = ["#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9", "#10"]
	const [nowColor, setNowColor] = useState(null)
	const [isActive, setIsActive] = useState(false)
  const [score, setScore] = useState([
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	])
	const [nowCnt, setNowCnt] = useState(0)
	const [btnState, setBtnState] = useState(0)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	
	useEffect(() => {
	
	}, [nowColor, score, nowCnt])

	const toggleSound = () => {
		setMutedSound(!mutedSound)
	}

  const handleIncrease = () => {
    console.log("증가 버튼 눌림")
		setBtnState(1)
  }

  const handleDecrease =  () => {
    console.log("감소 버튼 눌림")
  }

	const handleStart = () => {
		setIsActive(true)
		let interval;
		var cnt = 0
		
		setTimeout(3000)

		const changeImg = () => {

			const colors = [
				"", "#E8B0B0","#F03838","#EBEBEB","#FE9B7F","#F7F4EF","#C23445","#811F4C","#B28DB7","#3D2F2B","#BF1B36",
				"#FF8384","#81CCAB","#B9DDFF","#7EBC42","#8A97C3","#4A478C","#292830","#A18E40","#006359","#006E47",
				"#D1EEFB","#FDF650","#FEDCF5","#8884BE","#CEA9CB","#99A401","#422944","#818C75","#70491B","#FFFD36",
				"#FEBC60","#B2B099","#DBBAC7","#C189CA","#96B09D","#DD3737","#BCA548","#B8616D","#2F124E","#D73A6F",
				"#90E5D8","#5AC9E5","#F4CFFB","#F15D57","#B4BAD2","#006A8A","#535617","#546E6C","#5B2D41","#0000FE"
			]

			setNowColor(colors[cnt])
			if (btnState === 1) {
				setScore(score[nowCnt] += 1)
			}

			setBtnState(0)
			cnt++
			nowCnt++

			if (cnt === 51) {
				

				stopAct(interval)
				setIsActive(false)
				navigate("/help/result")
			}
		}
		interval = setInterval(changeImg, 3000)
		
		function stopAct(interval) {
			clearInterval(interval)
		}

		// 끝나면 버튼 다시 생기게
	}


	return (
		<div className="host" style={{ height: "100%" }}>
			<HostVideoComponent 
				user={props.user} 
				mutedSound={mutedSound}
				// nowColor={nowColor}
			/>
			{!isActive ? (
				<button onClick={handleStart}>
					시작
				</button>
			) : (
				<>
					<AnswerComponent
						handleIncrease={handleIncrease}
						handleDecrease={handleDecrease}
					/>
				</>
			)}
		</div>
	);

};

export default HostComponent;

// export default class HostComponent extends Component {
// 	constructor(props) {
// 			super(props);
// 			this.state = { 
// 				nickname: this.props.user.getNickname(), 
// 				showForm: false, mutedSound: false, 
// 				isFormValid: true,
// 				nowColor: this.props.nowColor
// 			};
// 			this.handleChange = this.handleChange.bind(this);
// 			this.handlePressKey = this.handlePressKey.bind(this);
// 			this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
// 			this.toggleSound = this.toggleSound.bind(this);
// 	}

// 	handleChange(event) {
// 			this.setState({ nickname: event.target.value });
// 			event.preventDefault();
// 	}

// 	toggleNicknameForm() {
// 			if (this.props.user.isLocal()) {
// 					this.setState({ showForm: !this.state.showForm });
// 			}
// 	}

// 	toggleSound() {
// 			this.setState({ mutedSound: !this.state.mutedSound });
// 	}

// 	handlePressKey(event) {
// 			if (event.key === 'Enter') {
// 					console.log(this.state.nickname);
// 					if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
// 							this.props.handleNickname(this.state.nickname);
// 							this.toggleNicknameForm();
// 							this.setState({ isFormValid: true });
// 					} else {
// 							this.setState({ isFormValid: false });
// 					}
// 			}
// 	}

// 	render() {
// 			return (
//         <div className="host" style={{ height: "100%" }}>
//           <HostVideoComponent 
// 						user={this.props.user} 
// 						mutedSound={this.state.mutedSound}
// 						nowColor={this.state.nowColor}
// 					/>
//         </div>
// 		);
// 	}
// }
