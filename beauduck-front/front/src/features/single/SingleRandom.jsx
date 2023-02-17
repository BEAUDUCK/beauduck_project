import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import BlackOut from '../../components/blackout/BlackOut';
import SingleModalInfo from './SingleModalInfo';

const SingleRandom = () => {
  const { makeupList } = useSelector((state) => state.single);
  const [random, setRandom] = useState([]);

  useEffect(() => {
    setRandom(_.sample(makeupList));
  }, [random]);

  const [isInfo, setIsInfo] = useState(false);
  const myNickname = useSelector((state) => state.member.nickName);
  const isToggleInfo = () => {
    if (!myNickname) {
      Swal.fire(
        '로그인이 필요한 서비스 입니다.',
        '로그인 페이지로 이동합니다.',
        'warning',
      );
      return <>{/* 로그인 모달창 이동 */}</>;
    }
    setIsInfo(!isInfo);
  };

  return (
    <div className="random-one" onClick={isToggleInfo}>
      <div className="random-one-inside">
        <img src={random?.img} alt="" />
        <div>
          <p>{random?.title}</p>
          <div className="star-info">
            <FontAwesomeIcon className="star-icon" icon="fa-solid fa-star" />
            <p>{Math.round(random.score * 10) / 10}</p>
            <p>({random.count})</p>
          </div>
        </div>
      </div>
      {isInfo && (
        <SingleModalInfo makeupId={random.id} isToggleInfo={isToggleInfo} />
      )}
      {isInfo && <BlackOut onClickEvent={isToggleInfo} />}
    </div>
  );
};

export default SingleRandom;
