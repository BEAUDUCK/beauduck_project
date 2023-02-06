import { useEffect } from "react";
import { useState } from "react";
import TabButton from "../components/button/TabButton";
import MyMakeupList from "../features/profile/MyMakeupList";
import MyProfile from "../features/profile/MyProfile";
import MyProfileSaveFace from "../features/profile/MyProfileSaveFace";
import MyRanking from "../features/profile/MyRanking";
import MyGalleryList from "../features/profile/MyGalleryList";
// 더미
import logo from "../assets/logo_original.png"


const dummyRecentMakeup = [
  {
    id: 1,
    title: "메이크업 이름",
    score: 4.5,
    count: 120,
    img: logo
  },
  {
    id: 2,
    title: "메이크업 이름",
    score: 4.5,
    count: 120,
    img: logo
  },
  {
    id: 3,
    title: "메이크업 이름",
    score: 4.5,
    count: 120,
    img: logo
  },
]

const dummyMadeMakeup = [
  {
    id: 1,
    title: "메이크업 이름",
    score: 4.5,
    count: 120,
    img: logo
  },
  {
    id: 2,
    title: "메이크업 이름",
    score: 4.5,
    count: 120,
    img: logo
  },
  {
    id: 3,
    title: "메이크업 이름",
    score: 4.5,
    count: 120,
    img: logo
  },
]

const dummyGallery = [
  {
    id: 1,
    img: logo
  },
  {
    id: 2,
    img: logo
  },
  {
    id: 3,
    img: logo
  },
]

const ProfilePage = () => {

  const [makeupState, setMakeupState] = useState(true)
  const [galleryState, setGalleryState] = useState(false)
  const [faceState, setFaceState] = useState(false)

  const handleMakeup = () => {
    setMakeupState(true)
    setGalleryState(false)
    setFaceState(false)
  }

  const handleGallery = () => {
    setMakeupState(false)
    setGalleryState(true)
    setFaceState(false)
  }

  const handleFace = () => {
    setMakeupState(false)
    setGalleryState(false)
    setFaceState(true)
  }

  const ChangeTab = () => {
    if (makeupState) {
      return <MyMakeupList recentMakeup={dummyRecentMakeup} madeMakeup={dummyMadeMakeup}/>
    } else if (galleryState) {
      return <MyGalleryList gallery={dummyGallery}/>
    } else {
      return <MyProfileSaveFace />
    }
  }

  useEffect(() => {

  }, [makeupState, galleryState, faceState])

  return (
    <div className="container">
      <div className="ProfilePage">
        <MyProfile />
        <MyRanking />
      </div>
      <div>
        <TabButton text={"메이크업 목록"} onClick={handleMakeup} addClass={"makeup-tab"}/>
        <TabButton text={"갤러리 목록"} onClick={handleGallery} addClass={"gallery-tab"}/>
        <TabButton text={"얼굴 저장"} onClick={handleFace} addClass={"face-tab"}/>
      </div>
      <div>
        <ChangeTab />
      </div>
    </div>
  )
}

export default ProfilePage;