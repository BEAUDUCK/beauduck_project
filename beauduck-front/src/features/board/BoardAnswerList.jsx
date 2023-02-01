import BoardAnswerListItem from './BoardAnswerListItem';

const BoardAnswerList = ({ commentList }) => {
  return (
    <>
      {commentList.map((item) => (
        <BoardAnswerListItem key={item.id} answer={item} />
      ))}
    </>
  );
};

export default BoardAnswerList;
