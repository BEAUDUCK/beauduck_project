const MyRanking = ({ myRanking }) => {
  return (
    <div className="my-ranking">
      <h2>내 랭킹</h2>
      <div className="my-ranking-item">
        <div>{myRanking.badge}</div>
        <div>{myRanking.nickname}</div>
        <div>{myRanking.exp}</div>
      </div>
    </div>
  )
};

export default MyRanking;