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
  const [idx, setIdx] = useState(-1);
  const navigate = useNavigate();
  const { userList } = useSelector((state) => state.consulting);
  const { memberId } = useSelector((state) => state.member);
  const admin = useSelector((state) => state.consulting.consultDetail.hostId);
  console.log('admin', admin);

  // let participantCount = undefined;
  // let recivedCount = 0;

  const [beforeIdx, setBeforeIdx] = useState(0);

  const [isClick, setIsClick] = useState(false);
  // console.log('isClick', isClick);
  console.log('beforeIdx', beforeIdx);
  console.log('nowIdx', nowIdx);

  const selectGood = () => {
    // dispatch(setScoreFirst(idx));
    // dispatch(setScoreSecond(idx));
    if (!isClick) {
      resultUsers.current.personalResults[nowIdx % 10] += 1;
      console.log(
        'resultUsers.current.personalResults',
        resultUsers.current.personalResults,
      );
      setIsClick(true);
    }
    if (beforeIdx !== nowIdx) {
      setBeforeIdx(nowIdx);
      setIsClick(false);
    }
    // true (이미 눌렀으면 눌렀다고 말해주기)
    // 아니면 처음 누를때 잘 눌렸다고 말해주기

    if (nowIdx === 4) {
      finishExercise();

      user.getStreamManager().stream.session.on('signal:finish', (event) => {
        const session = user.getStreamManager().stream.session;
        console.log('event.data', event.data);
      });
      //   // resultUsers.current.personalResults.push(JSON.parse(event.data));

      //   if (!userList) {
      //     userList = session.streamManagers.length;
      //     console.log('운동한 인원수 : ', userList);
      //   }
      //   recivedCount++;
      // });
    }
  };

  const finishExercise = (result) => {
    // setExercising(false)
    const res = {
      memberId,
      personalResultDetails: resultUsers.current.personalResults,
    };

    console.log('진단 끝! 내 어쩌구저쩌구 :  ', res);
    dispatch(setMyExerciseResult(res));
    // setAlert('alert');

    user.getStreamManager().stream.session.signal({
      data: JSON.stringify(res),
      type: 'finish',
      to: [admin],
    });
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
