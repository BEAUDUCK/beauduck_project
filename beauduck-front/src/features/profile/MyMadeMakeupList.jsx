import MyMadeMakeupListItem from "./MyMadeMakeupListItem";

const MyMadeMakeupList = ({ myMakeupList }) => {
  return (
    <div className="MyMadeMakeupList">
      <h1>내가 만든 메이크업</h1>
      <div style={{ display: "flex" }}>
        {myMakeupList.map((it) => (
          <MyMadeMakeupListItem 
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

export default MyMadeMakeupList;