import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import rank from '../../assets/rank.png';
import rank1 from '../../assets/rank/rank1.png';
import rank2 from '../../assets/rank/rank2.png';
import rank3 from '../../assets/rank/rank3.png';
import rank4 from '../../assets/rank/rank4.png';
import rank5 from '../../assets/rank/rank5.png';
import speechBubble from '../../assets/speechBubble.png';

const MyRanking = () => {
  const { userInfo } = useSelector((state) => state.profile);
  // const [myBadge, setMyBadge] = useState(userInfo?.badge);
  // const [myExp, setMyExp] = useState(userInfo?.exp);
  const [ment, setMent] = useState('');
  const expRatio = 5000 / userInfo?.exp;

  const [badgeImg, setBadgeImg] = useState('');
  useEffect(() => {
    switch (userInfo?.badge) {
      case '입덕':
        setBadgeImg(rank1);
        setMent('이제 시작이덕');
        break;
      case '초보덕':
        setBadgeImg(rank2);
        setMent('아직 서툴덕');
        break;
      case '아마추덕':
        setBadgeImg(rank3);
        setMent('아직 멀었덕');
        break;
      case '프로덕':
        setBadgeImg(rank4);
        setMent('제법 프로덕');
        break;
      case '슈퍼덕':
        setBadgeImg(rank5);
        setMent('내가 최고덕');
        break;
    }
  }, [userInfo]);

  return (
    <div className="MyRanking">
      <h1>MY EXP</h1>
      <div className="exp-box">
        <div className="exp-bar"></div>
        <div
          className="my-exp"
          style={{ width: `calc(80% / ${expRatio})` }}
        ></div>
        <p className="exp-text">{userInfo?.exp}</p>
        <div className="badge-div">
          <div>
            <img src={badgeImg} alt="" />
            <p>{userInfo?.badge}</p>
          </div>
          <div>
            <img src={speechBubble} alt="" className="speechBubble" />
            <p className="ment">{ment}</p>
          </div>
        </div>
      </div>
      {/* <img src={rank} alt="" className="rank-img" /> */}
    </div>
  );
};

export default MyRanking;
