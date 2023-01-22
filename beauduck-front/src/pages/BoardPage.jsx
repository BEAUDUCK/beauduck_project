import { useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';
import TabButton from '../components/button/TabButton';
import BoardList from '../features/board/BoardList';
import spring_light from '../assets/spring.png';

const BoardPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>쑥덕쑥덕</h1>
      <p>자유롭게 정보를 공유하고 질문을 등록하세요.</p>
      <div className="board-tab">
        <span>
          <TabButton text={'정보게시판'} />
          <TabButton text={'질문게시판'} />
        </span>
        <span>
          <input type="text" />
          <span onClick={() => navigate('/board/write')}>
            <Button text={'글쓰기'} />
          </span>
        </span>
      </div>
      <BoardList />
      {/* <img src={spring_light} alt="" /> */}
    </div>
  );
};

export default BoardPage;
