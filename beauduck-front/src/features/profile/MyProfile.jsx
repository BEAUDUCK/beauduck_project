import "../../pages/Profile.style.scss"
import { useEffect, useState } from "react"
import logo from "../../assets/logo_original.png"
import { useDispatch, useSelector } from "react-redux"
import { getMemberInfo } from "./ProfileSlice"

const MyProfile = () => {
  const dispatch = useDispatch()
  const { memberId } = useSelector(state=> state.member)
  // const { userInfo } = useSelector(state => state.userInfo)
  // console.log(userInfo)

  const profileLogoImg = logo
  const [profileImg, setProfileImg] = useState(profileLogoImg)
  useEffect(() => {
    console.log('dsdsd', memberId)
    dispatch(getMemberInfo(memberId))
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