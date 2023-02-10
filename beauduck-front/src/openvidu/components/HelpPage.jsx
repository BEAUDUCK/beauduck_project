import CustomRoomComponent from "./CustomRoomComponent";
import React, { useState } from "react";

const HelpPage = () => {

  const stageResult = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const totalResult = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  let currentCnt = 0;
  let isActive = false
  // 나중에 props로 받아올 userCount
  const userCount = 5
  const handleChangeCnt = (cnt, btnState) => {
    if (currentCnt === cnt) {
      if (btnState === 1) {
        if (!isActive) {
          totalResult[currentCnt % 10] += 1
          isActive = true
        } else {
          console.log("두 번 이상 눌렀습니다.")
        }
      } else if (btnState === 2) {
        console.log("눌렀지만 그대로")
      } else {
        console.log("안누름")
      }
    } else {
      if (totalResult[currentCnt] / userCount >= 0.5 ) {
        stageResult[currentCnt] += 1
      }
      currentCnt++
      isActive = false
      if (btnState === 1) {
        totalResult[currentCnt % 10] += 1
        isActive = true
      } else if (btnState === 2) {
        console.log("다음 cnt, 눌렀지만 그대로")
      } else {
        console.log("다음 cnt, 안누름")
      }
    }

    if (currentCnt === 50) {

    }
  }



  return (
    <>
      <CustomRoomComponent
        host={"내가호스트다"}
        handleChangeCnt={handleChangeCnt}
      />
    </>
  )
};

export default HelpPage;