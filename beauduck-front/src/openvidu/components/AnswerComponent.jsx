import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

const AnswerComponent = ({ handleDecrease, handleIncrease }) => {
  
  const dispatch = useDispatch()
  const myNickname = useSelector(state => state.member.nickName)


  // dispatch 로 보낼 때 풀어서 보내보자
  // const data = {}
  // data[myNickname] = score


  return (
    <div className="answercomponent">
      <button onClick={() => handleIncrease}>잘어울려요~</button>
      <button onClick={() => handleDecrease}>안어울려요~</button>
    </div>
  )
};

export default AnswerComponent;