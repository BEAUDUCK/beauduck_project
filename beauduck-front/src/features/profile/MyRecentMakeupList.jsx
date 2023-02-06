import MyRecentMakeupListItem from "./MyRecentMakeupListItem";

const MyRecentMakeupList = ({ recentMakeupList }) => {

  return (
    <div className="MyRecentMakeupList">
      <h1>최근 진행한 메이크업</h1>
      <div style={{ display: "flex" }}>
        {recentMakeupList.map((it) => (
          <MyRecentMakeupListItem
            key={it.id}
            title={it.title}
            score={it.score}
            count={it.count}
            img={it.img}
          />
        ))}
      </div>
    </div>
  )
};

export default MyRecentMakeupList;