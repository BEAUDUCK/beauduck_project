import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SingleRandom = () => {
  const { makeupList } = useSelector((state) => state.single);
  const [random, setRandom] = useState([]);

  useEffect(() => {
    setRandom(_.sample(makeupList));
    console.log(makeupList);
    console.log(random);
  }, []);
  return (
    <div className="random-one">
      <div>{random.title}</div>
      <img src={random.img} alt="" />
    </div>
  );
};

export default SingleRandom;
