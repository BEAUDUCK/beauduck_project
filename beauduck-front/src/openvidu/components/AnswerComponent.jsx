import React, { useEffect, useState } from "react"

const AnswerComponent = ({ user, userCount, userList, handleStart, handleBtnIncreased, handleBtnDecreased, isActive }) => {

  return (
    <div className="answercomponent" style={{ width: "30%" }}>
        <button onClick={handleStart}>시작!</button>
        <button onClick={handleBtnIncreased}>잘어울려요~</button>
        <button onClick={handleBtnDecreased}>안어울려요~</button>
      {/* {user.nickname} */}
    </div>
  )
};

export default AnswerComponent;