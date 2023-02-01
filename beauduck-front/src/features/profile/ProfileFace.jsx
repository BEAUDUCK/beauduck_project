import ProfileCapture from "./ProfileCapture";
import { useState } from 'react';
import BlackOut from '../../components/blackout/BlackOut';

const ProfileFace = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenModal = () => {
    setIsOpen(!isOpen);
  }  
  return (
  <div className="container">
    <div className = 'face-capture' 
      onClick={isOpenModal}> 
      <img src="https://i.pinimg.com/564x/87/82/70/87827051f59c920bd2443d2fc55f1ff5.jpg" alt="" />
    {isOpen && <ProfileCapture isOpenModal={isOpenModal} />}
    {isOpen && <BlackOut onClickEvent={isOpenModal} />}
    </div>
  </div>
  );
};

export default ProfileFace;