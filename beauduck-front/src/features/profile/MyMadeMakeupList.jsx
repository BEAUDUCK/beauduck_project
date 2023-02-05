import MyMadeMakeupListItem from "./MyMadeMakeupListItem";

const MyMadeMakeupList = ({ props }) => {
  return (
    <div className="MyMadeMakeupList">
      <h1>내가 만든 메이크업</h1>
      <div style={{ display: "flex" }}>
        {props.map((it) => (
          <MyMadeMakeupListItem 
            id={it.id}
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