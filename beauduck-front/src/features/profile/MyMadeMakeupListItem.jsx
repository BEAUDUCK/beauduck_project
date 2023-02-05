const MyMadeMakeupListItem = ({ title, score, count, img }) => {
  return (
    <div>
      <img 
        src={img} 
        alt="내가만든 메이크업 사진"
        style={{ width: "200px", height: "200px" }}
      />
      <div>{title}</div>
      <div>{score}</div>
      <div>{count}</div>
    </div>
  )
};

export default MyMadeMakeupListItem;