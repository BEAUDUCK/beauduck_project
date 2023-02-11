import '../../pages/Profile.style.scss';
import { useEffect, useState, useRef } from 'react';
import logo from '../../assets/logo_original.png';
import { useDispatch, useSelector } from 'react-redux';
import { checkNickname, getMemberInfo, updateMemberInfo } from './ProfileSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyProfile = () => {
  const dispatch = useDispatch();
  const profileLogoImg = logo;
  const [profileImg, setProfileImg] = useState(profileLogoImg);

  const { memberId } = useSelector((state) => state.member);
  const { userInfo } = useSelector((state) => state.profile);

  const [userNickname, setUserNickname] = useState('');
  const [userContent, setUserContent] = useState('');

  useEffect(() => {
    setUserNickname(userInfo?.nickName);
    setUserContent(userInfo?.content);
  }, [userInfo]);

  const [edited, setEdited] = useState(false);
  // const fileInput = useRef(null);

  const handleEdited = () => {
    setEdited(!edited);
  };
  // const handleChangeImage = (e) => {
  //   if (e.target.files[0]) {
  //     setProfileImg(e.target.files[0]);
  //   } else {
  //     setProfileImg(profileImg);
  //     return;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setProfileImg(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  const nicknameRef = useRef();
  const handleChangeProfile = () => {
    if (usable) {
      nicknameRef.current.focus();
      return;
    }
    const updatedInfo = {
      memberId,
      nickName: userNickname,
      content: userContent,
    };

    dispatch(updateMemberInfo(updatedInfo));
    setEdited(!edited);
  };

  const [usable, setUsable] = useState(false);

  const checkOver = () => {
    dispatch(checkNickname(userNickname)).then((res) => {
      setUsable(res.payload.data);
    });
  };

  return (
    <div className="MyProfile">
      {!edited ? (
        <div>
          <div className="profile-nickname">
            <div className="circle"></div>
            <h2>{userInfo?.nickName}</h2>
          </div>
          <div className="background-div"></div>
          <div className="profile-div">
            <img className="profile-img" src={profileImg} alt="프로필사진" />
            <div className="profile-content">
              <p>{userInfo?.content}</p>
            </div>
          </div>
          <button className="profile-btn" onClick={handleEdited}>
            수정
          </button>
        </div>
      ) : (
        <>
          {/* <div className="profile-img-div">
            <input
              type="file"
              className="profile-img"
              accept="image/jpg, image/png, image/jpeg"
              onChange={handleChangeImage}
              ref={fileInput}
            />
          </div> */}
          <div className="nickname-update">
            <input
              ref={nicknameRef}
              value={userNickname}
              onChange={(e) => setUserNickname(e.target.value)}
            />
            {/* <button onClick={checkOver}>중복 확인</button> */}
            <FontAwesomeIcon
              icon="fa-regular fa-circle-check"
              onClick={checkOver}
              className={!usable ? 'checked' : ''}
            />
          </div>
          <div className="profile-div">
            <img className="profile-img" src={profileImg} alt="프로필사진" />
            <textarea
              value={userContent}
              onChange={(e) => setUserContent(e.target.value)}
            />
          </div>
          <button className="profile-btn" onClick={handleChangeProfile}>
            완료
          </button>
        </>
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
  );
};

export default MyProfile;
