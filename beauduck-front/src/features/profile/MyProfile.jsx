import "../../pages/Profile.style.scss"
import { useEffect, useState, useRef } from "react"
import logo from "../../assets/logo_original.png"
import { useDispatch, useSelector } from "react-redux"
import { getMemberInfo } from "./ProfileSlice"

const MyProfile = () => {
  const dispatch = useDispatch()
  const profileLogoImg = logo
  const [profileImg, setProfileImg] = useState(profileLogoImg)
  const { memberId } = useSelector(state => state.member)
  const [userNickname, setUserNickname] = useState("닉네임")
  const [userContent, setUserContent] = useState("자기소개")
  const [edited, setEdited] = useState(false);
  const fileInput = useRef(null)
  // const [newContent, SetNewContent] = useState(usercontent)
  useEffect(() => {
    console.log('memberId :', memberId)
    dispatch(getMemberInfo(memberId))
  }, [])

  const handleEdited = () => {
    setEdited(!edited)
  }

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setProfileImg(e.target.files[0])
    } else {
      setProfileImg(profileImg)
      return
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const handleChangeNickname = (e) => {
    setUserNickname(e.target.value)
    console.log(e.target.value)
  }

  const handleChangeContent = (e) => {
    setUserContent(e.target.value)
    console.log(e.target.value)
  }

  const handleChangeProfile = () => {
    const updatedInfo = {
      memberId: memberId,
      nickname: userNickname,

    }
  }

  return (
    <div className="MyProfile">
      {!edited ? (
        <div>
          <div className="profile-img-div">
            <img
              className="profile-img"
              src={profileImg}
              alt="프로필사진" 
            />
          </div>
          <div className="profile-nickname">
            {/* <p>{props.nickname}</p> */}
            <p>{userNickname}</p>
          </div>
          <div className="profile-content">
            <div>{userContent}</div>
          </div>
          <button onClick={handleEdited} >
            수정
          </button>
        </div>
      ) : (
        <div className="MyProfile">
          <div className="profile-img-div">
            <input
              type="file"
              className="profile-img"
              accept="image/jpg, image/png, image/jpeg"
              onChange={handleChangeImage}
              ref={fileInput}
            />
          </div>
          <div>
            <input
              value={userNickname}
              onChange={handleChangeNickname}
            />
          </div>
          <div>
            <input
              type="textarea"
              value={userContent}
              onChange={handleChangeContent}
            />
          </div>
          <button onClick={handleChangeProfile}>완료</button>
        </div>
      )}
    </div>
    // <div className="MyProfile">
    //   <div className="profile-img-div">
    //     <img
    //       className="profile-img"
    //       src=   
    //       alt="프로필사진" 
    //     />
    //   </div>
    //   <div className="profile-nickname">
    //     {/* <p>{props.nickname}</p> */}
    //     <p>닉네임입니다</p>
    //   </div>
    //   <div className="profile-content">
    //     <div>자기소개 입니다.</div>
    //   </div>
    // </div>
  )
}

export default MyProfile;