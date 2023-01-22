import './Board.style.scss';
import BoardListItem from './BoardListItem';

const BoardList = () => {
  const testList = [
    {
      id: 1,
      title: '글1',
      member_id: 4,
      content: '내용내용',
      count: 4,
      like: 3,
    },
    {
      id: 2,
      title: '글2',
      member_id: 4,
      content: '내용내용',
      count: 4,
      like: 3,
    },
    {
      id: 3,
      title: '글3',
      member_id: 4,
      content: '내용내용',
      count: 4,
      like: 3,
    },
  ];
  return (
    <div>
      <div className={['board-list', 'board-header'].join(' ')}>
        <p>번호</p>
        <p className="board-title">제목</p>
        <p>작성자</p>
        <p>조회</p>
        <p>좋아요</p>
      </div>
      {testList.map((item) => (
        <BoardListItem key={item.id} boardItem={item} />
      ))}
    </div>
  );
};

export default BoardList;
