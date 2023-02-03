import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Single.test.scss';
import SingleMakeDetail from './SingleMakeDetail';
import SingleMakeFirst from './SingleMakeFirst';

const SingleMake = ({ onToggleMake }) => {
  const dispatch = useDispatch();

  const { memberId } = useSelector((state) => state.member);

  // 입력 페이지 이동
  const { completed } = useSelector((state) => state.single);

  // 이미지는 따로 처리
  const [img, setImg] = useState('');
  const getFinalImg = (img) => {
    const newImg = img;
    setImg(newImg);
  };

  const { title, content, duration } = useSelector((state) => state.single);

  const [makeupMainList, setMakeupMainList] = useState([]);

  // 마지막 !!!! (데이터 합산)
  const getMainList = (data) => {
    setMakeupMainList(data);
    createMakeup();
  };

  const createMakeup = () => {
    const finalMakeup = {
      content,
      count: 0,
      duration,
      img,
      memberId,
      score: 0,
      title,
      makeupMainList,
    };
    // 완료를... 두번 눌러야하네?^^
    console.log(finalMakeup);

    // axios 요청 보내기...^^
    // dispatch()
  };

  return (
    <div className="makeup-make">
      <h2>메이크업 만들기</h2>
      <p>TIP. 상세한 설명과 이미지, 색상이 있다면 아주 좋아요!</p>
      <FontAwesomeIcon onClick={onToggleMake} icon="xmark" className="xmark" />
      {!completed && (
        <>
          <SingleMakeFirst sendFinalImg={getFinalImg} />
        </>
      )}
      {completed && (
        <>
          <SingleMakeDetail getMakeupList={getMainList} />
        </>
      )}
    </div>
  );
};

export default SingleMake;
