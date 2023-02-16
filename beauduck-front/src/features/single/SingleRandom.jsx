import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SingleRandom = () => {
  const { makeupList } = useSelector((state) => state.single);
  const [random, setRandom] = useState([]);

  useEffect(() => {
    setRandom(_.sample(makeupList));
  }, [random]);

  return (
    <div className="random-one">
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
    </div>
  );
};

export default SingleRandom;
