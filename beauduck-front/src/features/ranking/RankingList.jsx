import * as React from 'react';
const RankingList = ({ dummyData }) => {
  const rankingData = dummyData.slice(0, 10).sort(function (a, b) {
    return b.exp - a.exp;
  });

  return (
    <div className="RankingList">
      {rankingData.map((it, index) => {
        if (index < 3) {
          return (
            <div className="ranking-top">
              <div>{index + 1}</div>
              <div>{it.badge}</div>
              <div>{it.nickname}</div>
              <div>{it.exp}</div>
            </div>
          );
        } else {
          return (
            <div className="ranking-others">
              <div>{index + 1}</div>
              <div>{it.badge}</div>
              <div>{it.nickname}</div>
              <div>{it.exp}</div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default RankingList;
