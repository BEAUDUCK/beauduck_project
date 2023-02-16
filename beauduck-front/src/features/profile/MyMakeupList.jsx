import MyMakeupListItem from './MyMakeupListItem';

const MyMakeupList = ({ recentMakeup, madeMakeup }) => {
  return (
    <div className="MyMakeupList">
      <div className="recent-div">
        <h2>최근 진행한 메이크업</h2>
        <div className="MyMakeup-item">
          {recentMakeup?.map((item) => (
            <MyMakeupListItem key={item.id} makeup={item} />
          ))}
        </div>
      </div>
      <div className="made-div">
        <h2>내가 만든 메이크업</h2>
        <div className="MyMakeup-item">
          {madeMakeup?.map((item) => (
            <MyMakeupListItem key={item.id} makeup={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyMakeupList;
