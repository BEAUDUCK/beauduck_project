import TogetherListItem from './TogetherListItem';

const TogetherList = ({ roomList }) => {
  return (
    <div className="together-list">
      <div className='together-list-child'>
        {roomList.map((room) => (
          <TogetherListItem key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default TogetherList;
