import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import BlackOut from '../../components/blackout/BlackOut';
import SingleModalInfo from './SingleModalInfo';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const SingleListItem = ({ modeItem, idx }) => {
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

  const bgColor = ['#feccbe', '#feebb6', '#ddecca', '#b8e6e1'];
  const color = parseInt(idx % 4);

  return (
    <>
      <div
        className="makeup-list"
        style={{ backgroundColor: `${bgColor[color]}` }}
        onClick={isToggleInfo}
      >
        <div className="makeup-list-inside">
          <div>
            <img src={modeItem.img} alt="img" />
          </div>
          <div className="makeup-list-info">
            <p className="makeup-title">{modeItem.title}</p>
            <div className="star-info">
              <FontAwesomeIcon className="star-icon" icon="fa-solid fa-star" />
              <span>{Math.round(modeItem.score * 10) / 10}</span>
              <span>({modeItem.count})</span>
            </div>
          </div>
        </div>
      </div>
      {isInfo && (
        <SingleModalInfo makeupId={modeItem.id} isToggleInfo={isToggleInfo} />
      )}
      {isInfo && <BlackOut onClickEvent={isToggleInfo} />}
    </>
  );
};

export default SingleListItem;
