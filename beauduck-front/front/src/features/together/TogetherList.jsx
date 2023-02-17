import TogetherListItem from './TogetherListItem';

const TogetherList = ({ togetherList }) => {
  return (
    <div className="together-list">
      <div className='together-list-child'>
        {togetherList !== undefined && togetherList.map((item) => (
          <TogetherListItem key={item.id} togetherItem={item} />
        ))}
      </div>
    </div>
  );
};

export default TogetherList;
