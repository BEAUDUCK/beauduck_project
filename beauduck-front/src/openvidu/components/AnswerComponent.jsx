import React, { useEffect, useState } from "react"

const AnswerComponent = ({ user, userCount, userList }) => {

  const [stageResult, setStageResult] = useState([])
  const [totalResult, setTotalResult] = useState([])
  const [count, setCount] = useState(null)
  let userResult = {}

  useEffect(() => {
    // userList.map((it) => {
    //   userResult[it.nickname] = [0] * 50
    // })
  }, [])
  
  const handleStart = () => {
    // 1번 색 배경 보여주고
    // 화면에다가 넣어주면 될듯?
    const color = ["#E8B0B0","#F03838","#EBEBEB","#FE9B7F","#F7F4EF","#C23445","#811F4C","#B28DB7","#3D2F2B","#BF1B36",
    "#FF8384","#81CCAB","#B9DDFF","#7EBC42","#8A97C3","#4A478C","#292830","#A18E40","#006359","#006E47",
    "#D1EEFB","#FDF650","#FEDCF5","#8884BE","#CEA9CB","#99A401","#422944","#818C75","#70491B","#FFFD36",
    "#FEBC60","#B2B099","#DBBAC7","#C189CA","#96B09D","#DD3737","#BCA548","#B8616D","#2F124E","#D73A6F",
    "#90E5D8","#5AC9E5","#F4CFFB","#F15D57","#B4BAD2","#006A8A","#535617","#546E6C","#5B2D41","#0000FE"
    ]
    // setTimeOut 5초
    setTimeout
    // 결과 저장 후 반복
  
  }

  const handleIncrease = (props) => {
    setCount(+1)
  };

  console.log(userList)

  return (
    <div className="answercomponent" style={{ width: "30%" }}>
      <button onClick={handleStart}>시작!</button>
      <button onClick={handleIncrease}>잘어울려요~</button>
      {/* {user.nickname} */}
    </div>
  )
};

export default AnswerComponent;