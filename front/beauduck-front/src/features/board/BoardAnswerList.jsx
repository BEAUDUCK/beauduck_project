import BoardAnswerListItem from './BoardAnswerListItem';

const BoardAnswerList = ({ commentList, boardId }) => {
  return (
    <>
      {commentList.map((item) => (
        <BoardAnswerListItem key={item.id} answer={item} boardId={boardId} />
      ))}
    </>
  );
};

export default BoardAnswerList;
