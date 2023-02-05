import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const MyRanking = () => {

  const [myRank, setMyRank] = useState([])
  const [rankList, setRankList] = useState([])
  const getRankList = () => {
    // axios 요청
  }
  const getMyRank = () => {
    // axios 요청
  }
  

  useEffect(() => {

  }, [])

  return (
    <div 
      className="MyRanking"
    >
      <div className="myranking-up">
        나보다 +1 랭킹
      </div>
      <div className="myranking-me">
        내 랭킹
      </div>
      <div className="myranking-down">
        나보다 -1 랭킹
      </div>
    </div>
  )
};

export default MyRanking;