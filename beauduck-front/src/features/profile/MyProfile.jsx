import "../../pages/Profile.style.scss"
import { useEffect } from "react"
import { useState } from "react"
import logo from "../../assets/logo_original.png"

const MyProfile = () => {

  const profileLogoImg = logo
  const [profileImg, setProfileImg] = useState(profileLogoImg)
  useEffect(() => {

  }, [])

  return (
    <div className="MyProfile">
      <div className="profile-img-div">
        <img
          className="profile-img"
          src={profileImg} 
          alt="프로필사진" 
        />
      </div>
      <div className="profile-nickname">
        {/* <p>{props.nickname}</p> */}
        <p>닉네임입니다</p>
      </div>
      <div className="profile-content">
        <div>자기소개 입니다.</div>
      </div>
    </div>
  )
}

export default MyProfile;