import BoardAnswerListItem from './BoardAnswerListItem';

const BoardAnswerList = () => {
  const testComments = [
    {
      id: 1,
      member_id: 2,
      content: '오 굿',
      like: 2,
      created_at: '2023-01-22 17:54',
    },
    {
      id: 2,
      member_id: 2,
      content: '리얼리?',
      like: 5,
      created_at: '2023-01-22 17:55',
    },
  ];

  return (
    <>
      {testComments.map((item) => (
        <BoardAnswerListItem key={item.id} answer={item} />
      ))}
    </>
  );
};

export default BoardAnswerList;
