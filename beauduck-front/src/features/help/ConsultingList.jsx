import './Help.style.scss';
import ConsultingListItem from '../help/ConsultingListItem';
import backShape3 from '../../assets/backShape3.png';
import backShape4 from '../../assets/backShape4.png';
import _ from 'lodash';
import { useEffect, useState } from 'react';

const ConsultingList = ({ consultingList }) => {
  const [randomOne, setRandomOne] = useState();
  useEffect(() => {
    setRandomOne(_.sample(consultingList));
  }, []);

  return (
    <div className="consulting-div">
      <img src={backShape3} alt="" className="back-shape3" />
      <img src={backShape4} alt="" className="back-shape4" />
      <div className="random-consulting">
        {/* <p>{randomOne.hostNickname}</p> */}
      </div>
      <div className="consulting-list">
        <div className="consulting-list-child">
          {consultingList.map((item) => (
            <ConsultingListItem key={item.roomId} consultingItem={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultingList;
