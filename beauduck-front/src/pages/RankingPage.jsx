import "./Ranking.style.scss"
import { useEffect, useState } from "react";
import RankingList from "../features/ranking/RankingList";
import MyRanking from "../features/ranking/MyRanking";
import logo from "../assets/logo_original.png"


const RankingPage = () => {

  const [rankingData, setRankingData] = useState([]);
  const [myRankingData, setMyRankingData] = useState(null);
  
  // useEffect(() => {
  //   axios.get({
  //     url: ``,
  //   })
  //     .then((res) => {
  //       setRankingData(res.data)
  //     })
  //   axios.get({
  //     url: ``
  //   })
  //     .then((res) => {
  //       setMyRankingData(res.data)
  //     })
        
  // }, rankingData, myRankingData)

  const mainLogo = logo

  const dummyData = [
    {
      "id": 1,
      "nickname": "M1",
      "badge": "개씹덕",
      "exp": 1648
    },
    {
      "id": 2,
      "nickname": "M2",
      "badge": "십덕",
      "exp": 1564
    },
    {
      "id": 3,
      "nickname": "M3",
      "badge": "십덕",
      "exp": 1357
    },
    {
      "id": 4,
      "nickname": "M4",
      "badge": "오덕",
      "exp": 1205
    },
    {
      "id": 5,
      "nickname": "M5",
      "badge": "오덕",
      "exp": 1048
    },
    {
      "id": 6,
      "nickname": "M6",
      "badge": "오덕",
      "exp": 976
    },
    {
      "id": 7,
      "nickname": "M7",
      "badge": "오덕",
      "exp": 853
    },
    {
      "id": 8,
      "nickname": "M8",
      "badge": "오덕",
      "exp": 654
    },
    {
      "id": 9,
      "nickname": "M9",
      "badge": "입덕",
      "exp": 342
    },
    {
      "id": 10,
      "nickname": "M9",
      "badge": "입덕",
      "exp": 128
    },

  ]

  const dummyMyRankingData = 
    {
      "id": 33,
      "nickname": "배고파",
      "badge": "아기오리",
      "exp": -33
    }
  
  

  return (
    <div className="container">
      <div className="RankingPage">
        <div className="ranking-container">
          <div>
            <img 
              className="main-logo"
              src={mainLogo}
              alt="로고 이미지"
            />
          </div>
          <RankingList dummyData={dummyData} />
        </div>
        <br/>
        <div>
          <MyRanking myRanking={dummyMyRankingData}/>
        </div>
      </div>
    </div>
  )
};

export default RankingPage;