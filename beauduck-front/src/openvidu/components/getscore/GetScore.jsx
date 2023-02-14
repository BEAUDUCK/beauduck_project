import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  setMyExerciseResult,
  setScoreFirst,
  setScoreSecond,
} from '../../../features/help/ConsultingSlice';

const GetScore = ({ nowIdx, user, resultUsers }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [idx, setIdx] = useState(-1);
  const { userList } = useSelector((state) => state.consulting);
  const { memberId } = useSelector((state) => state.member);
  const admin = useSelector((state) => state.consulting.consultDetail.hostId);
  // console.log('admin', admin);

  // let participantCount = undefined;
  // let recivedCount = 0;

  const [beforeIdx, setBeforeIdx] = useState(0);
  const didMount = useRef(false);

  const [isClick, setIsClick] = useState(false);
  console.log('isClick', isClick);
  console.log('beforeIdx', beforeIdx);
  console.log('nowIdx', nowIdx);

  // 🦴 인덱스가 바뀌면 isClick을 false로 초기화
  useEffect(() => {
    if (didMount.current) {
      if (isClick) {
        resultUsers.current.personalResults.push(parseInt(1)); // 눌렀으면 1 추가
      } else {
        resultUsers.current.personalResults.push(parseInt(0)); // 안 눌렀으면 0 추가
      }
      console.log('resultUsers', resultUsers.current.personalResults);
      setIsClick(false);
    } else {
      didMount.current = true;
    }
  }, [nowIdx]);

  // 버튼 클릭 이벤트
  const selectGood = () => {
    setIsClick(true);

    // 이미 해당 인덱스 값이 들어감
    // if (resultUsers.length === nowIdx) {
    //   resultUsers[nowIdx % 10] += 1;
    //   console.log(
    //     'resultUsers.current.personalResults',
    //     resultUsers.current.personalResults,
    //   );
    //   setIsClick(true);
    // }

    // console.log('resultUsers', resultUsers);

    // 해당 인덱스 값에 딱 한번 넣어줌
    // if (!isClick && beforeIdx !== nowIdx) {
    //   console.log('resultUsers[nowIdx]', resultUsers[parseInt(nowIdx)]);
    //   resultUsers[parseInt(nowIdx)] += 1;
    //   setBeforeIdx(nowIdx);
    // setIsClick(true);
    // } else {
    //   setIsClick(false);
    // }
    // true (이미 눌렀으면 눌렀다고 말해주기)
    // 아니면 처음 누를때 잘 눌렸다고 말해주기

    // if (nowIdx === 4) {
    // finishExercise();

    // user.getStreamManager().stream.session.on('signal:finish', (event) => {
    //   const session = user.getStreamManager().stream.session;
    //   console.log('event.data', event.data);
    // });
    //   // resultUsers.current.personalResults.push(JSON.parse(event.data));

    //   if (!userList) {
    //     userList = session.streamManagers.length;
    //     console.log('운동한 인원수 : ', userList);
    //   }
    //   recivedCount++;
    // });
    // }
  };

  return (
    <>
      <button onClick={selectGood} className="select-button">
        good
      </button>
    </>
  );
};

export default GetScore;
