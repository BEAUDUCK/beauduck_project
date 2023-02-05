const MyRecentMakeupListItem = ({id, title, score, count, img}) => {
  
  
  return (
    <div className="MyRecentMakeupListItem">
      <img 
        src={img}
        style={{ width: "200px", height: "200px" }}
        alt="최근 메이크업 사진"
      />
      <div>{id}</div>
      <div>{title}</div>
      <div>{score}</div>
      <div>{count}</div>
    </div>
  )
};

export default MyRecentMakeupListItem;