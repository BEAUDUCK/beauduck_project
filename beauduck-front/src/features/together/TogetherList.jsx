import TogetherListItem from './TogetherListItem';

const TogetherList = ({ roomList }) => {
  return (
    <div className="together-rooms">
      {roomList.map((room) => (
        <TogetherListItem key={room.id} room={room} />
      ))}
    </div>
  );
};

export default TogetherList;
