import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react';
import BlackOut from '../../components/blackout/BlackOut';
import SingleModalInfo from './SingleModalInfo';

const SingleListItem = ({ modeItem, idx }) => {
  const [isInfo, setIsInfo] = useState(false);
  const isToggleInfo = () => {
    setIsInfo(!isInfo);
  };

  const bgColor = [
    ['#BAB2DB', '#3E2868'],
    ['#E3CDD6', '#E97694'],
    ['#E9DFD0', '#F5BA5C'],
    ['#F4C3A5', '#E66E32'],
  ];
  const color = parseInt(idx % 4);

  return (
    <>
      <div
        className={['makeup-div', idx % 2 ? 'makeup-div-odd' : ''].join(' ')}
        style={{ backgroundColor: `${bgColor[color][0]}` }}
      >
        <div onClick={isToggleInfo}>
          <img src={modeItem.img} alt="img" />
          <p style={{ color: `${bgColor[color][1]}` }}>{modeItem.title}</p>
          <div className="star-info">
            <FontAwesomeIcon className="star-icon" icon="fa-solid fa-star" />
            <p>{Math.round(modeItem.score * 10) / 10}</p>
            <p>({modeItem.count})</p>
          </div>
        </div>
      </div>
      {isInfo && (
        <SingleModalInfo makeupId={modeItem.id} isToggleInfo={isToggleInfo} />
      )}
      {/* {isInfo && <BlackOut onClickEvent={isToggleInfo} />} */}
    </>
  );
};

export default SingleListItem;
