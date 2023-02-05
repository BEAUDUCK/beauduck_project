import MyMadeMakeupList from "./MyMadeMakeupList";
import MyRecentMakeupList from "./MyRecentMakeupList";

const MyMakeupList = ({recentMakeup, madeMakeup}) => {
  return (
    <div className="MyMakeupList">
      <MyRecentMakeupList props={recentMakeup} />
      <MyMadeMakeupList props={madeMakeup} />
    </div>
  )
};

export default MyMakeupList;