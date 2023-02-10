import { useEffect } from 'react';
import { useState } from 'react';
import rank from '../../assets/rank.png';
import rank1 from '../../assets/rank/rank1.png';
import rank2 from '../../assets/rank/rank2.png';
import rank3 from '../../assets/rank/rank3.png';
import rank4 from '../../assets/rank/rank4.png';
import rank5 from '../../assets/rank/rank5.png';

const MyRanking = () => {
  const [myBadge, setMyBadge] = useState('초보덕');
  const [myExp, setMyExp] = useState(250);
  const expRatio = 5000 / myExp;
  const getMyRank = () => {
    // axios 요청
  };

  const [badgeImg, setBadgeImg] = useState('');
  useEffect(() => {
    switch (myBadge) {
      case '입덕':
        setBadgeImg(rank1);
      case '초보덕':
        setBadgeImg(rank2);
      case '아마추덕':
        setBadgeImg(rank3);
      case '프로덕':
        setBadgeImg(rank4);
      case '슈퍼덕':
        setBadgeImg(rank5);
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="MyRanking">
      <h1>MY EXP</h1>
      <div className="exp-box">
        <div className="exp-bar"></div>
        <div
          className="my-exp"
          style={{ width: `calc(80% / ${expRatio})` }}
        ></div>
        <p className="exp-text">{myExp}</p>
        <div className="badge-div">
          <img src={badgeImg} alt="" />
          <p>{myBadge}</p>
        </div>
      </div>
      <img src={rank} alt="" className="rank-img" />
    </div>
  );
};

export default MyRanking;
