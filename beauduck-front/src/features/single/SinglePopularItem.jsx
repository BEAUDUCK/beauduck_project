import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import BlackOut from '../../components/blackout/BlackOut';
// import SingleModalInfo from './SingleModalInfo';

const SinglePopularItem = ({ modeItem, idx }) => {
  const [isInfo, setIsInfo] = useState(false);
  const isToggleInfo = () => {
    setIsInfo(!isInfo);
  };

  const bgColor = ['#feccbe', '#feebb6', '#ddecca', '#b8e6e1'];
  const color = parseInt(idx % 4);
  return (
    <>
      <div
        className="makeup-div"
        style={{ backgroundColor: `${bgColor[color]}` }}
      >
        <div className="makeup-div-inside" onClick={isToggleInfo}>
          <img src={modeItem.img} alt="img" />
          <div>
            <p>{modeItem.title}</p>
            <div className="star-info">
              <FontAwesomeIcon className="star-icon" icon="fa-solid fa-star" />
              <p>{Math.round(modeItem.score * 10) / 10}</p>
              <p>({modeItem.count})</p>
            </div>
          </div>
        </div>
      </div>
      {isInfo && (
        <div className="detail-test">
          <img src={modeItem.img} alt="" />
        </div>
        // <SingleModalInfo makeupId={modeItem.id} isToggleInfo={isToggleInfo} />
      )}
      {isInfo && <BlackOut onClickEvent={isToggleInfo} />}
    </>
  );
};

export default SinglePopularItem;
