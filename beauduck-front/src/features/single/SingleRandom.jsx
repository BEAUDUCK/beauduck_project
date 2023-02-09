import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SingleRandom = () => {
  const { makeupList } = useSelector((state) => state.single);
  const [random, setRandom] = useState([]);

  useEffect(() => {
    setRandom(_.sample(makeupList));
  }, []);

  return (
    <div className="random-one">
      <img src={random?.img} alt="" />
      <p>{random?.title}</p>
    </div>
  );
};

export default SingleRandom;
