import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import BoardInfoPage from '../../pages/BoardInfoPage';
import BoardQnAPage from '../../pages/BoardQnAPage';

const BoardListItem = ({ boardItem, idx, isInfo }) => {
  const navigate = useNavigate();
  const [isCheck, setCheck] = useState(false);
  // const goToWhere = () => {
  //   if (isInfo) {
  //     navigate(`/board/info/${boardItem.id}`);
  //   } else {
  //     navigate(`/board/qna/${boardItem.id}`);
  //   }
  // };
  return (
    <>
    <div className="board-list" onClick={() => {setCheck((e) => !e);}}>
      <p>{idx + 1}</p>
      <p className="board-title">{boardItem.title}</p>
      <p>{boardItem.writer}</p>
      <p>{boardItem.count}</p>
      <p>{boardItem.likes}</p>
    </div>
    
    {isCheck && (
      <div>{isInfo ? (
        <BoardInfoPage />
        ): (<BoardQnAPage/>)}</div>
    ) } 
    </>
  );
};

export default BoardListItem;
