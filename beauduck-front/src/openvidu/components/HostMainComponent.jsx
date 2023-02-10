import React, { useState, useMemo } from "react";
import HostComponent from "./stream/HostComponent";
import RestTime from "./RestTime";
import ToolbarComponent from "./toolbar/ToolbarComponent";
import Message from "./Message";
import SmallConsultantStream from "./stream/SmallConsultantStream";
import AnswerComponent from "./AnswerComponent";


const HostMainComponent = ({ host, localUser, sessionId, showNotification, camStatusChanged, micStatusChanged }) => {

  const color = [
    "#E8B0B0","#F03838","#EBEBEB","#FE9B7F","#F7F4EF","#C23445","#811F4C","#B28DB7","#3D2F2B","#BF1B36",
    "#FF8384","#81CCAB","#B9DDFF","#7EBC42","#8A97C3","#4A478C","#292830","#A18E40","#006359","#006E47",
    "#D1EEFB","#FDF650","#FEDCF5","#8884BE","#CEA9CB","#99A401","#422944","#818C75","#70491B","#FFFD36",
    "#FEBC60","#B2B099","#DBBAC7","#C189CA","#96B09D","#DD3737","#BCA548","#B8616D","#2F124E","#D73A6F",
    "#90E5D8","#5AC9E5","#F4CFFB","#F15D57","#B4BAD2","#006A8A","#535617","#546E6C","#5B2D41","#0000FE"
  ]

  const [isActive, setIsActive] = useState(false)
  const [nowColor, setNowColor] = useState(null)

  for (let i = 0;i < 50; i++) {
    setTimeout(
      setNowColor(color[i])
      , 3000)
  }


  return (
    <>
      {host === localUser ? (
        <div className='host-div' style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
          <div className='room-title' style={{ height: "5vh" }}>
            {`${host}의 방이당`}
          </div>
          {localUser !== undefined && localUser.getStreamManager() !== undefined && (
            <div className="host" style={{ height: "70vh" }}>
              <HostComponent user={localUser} handleNickname={this.nicknameChanged}/>
            </div>
            )}
          <div className='sub' style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "15vh" }}>
            <RestTime />
            <ToolbarComponent
              sessionId={sessionId}
              user={localUser}
              showNotification={showNotification}
              camStatusChanged={camStatusChanged}
              micStatusChanged={micStatusChanged}
            />
            <Message />
          </div>
        </div>
      ) : (
        <div className='host-div' style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }} >
          <div className='room-title' style={{ height: "5vh" }}>
            {`${host}의 방인가?`}
          </div>
          {/* 일단 퍼블리셔를 호스트로 */}
          {localUser !== undefined && localUser.getStreamManager() !== undefined && (
            <div className="host" style={{ height: "70vh" }}>
              <HostComponent user={localUser} handleNickname={this.nicknameChanged}/>
            </div>
            )}
          <div className='sub' style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100%", height: "25vh" }}>
          {localUser !== undefined && localUser.getStreamManager() !== undefined && (
            <div className="consultant-small" style={{ width: "50%", height: "100%" }} >
              <SmallConsultantStream user={localUser} handleNickname={this.nicknameChanged}/>
            </div>
            )}
            <AnswerComponent
              user={localUser}
              // userCount={userCount}
              // userList={userList}
            />
          </div>
        </div>
      )}
    
    </>
  )
};

export default HostMainComponent;