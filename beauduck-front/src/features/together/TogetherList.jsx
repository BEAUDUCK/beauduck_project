import TogetherListItem from './TogetherListItem';

const TogetherList = ({ togetherList }) => {
  return (
    <div className="together-list">
      <div className='together-list-child'>
        {togetherList.map((item) => (
          <TogetherListItem key={item.id} consultingItem={item} />
        ))}
      </div>
    </div>
  );
};

export default TogetherList;
