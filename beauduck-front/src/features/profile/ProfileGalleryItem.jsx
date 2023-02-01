import { useState } from 'react';
import BlackOut from '../../components/blackout/BlackOut';
import GalleryInfo from './GalleryInfo';

const ProfileGalleryItem = ({ modeItem }) => {
  const [isInfo, setIsInfo] = useState(false);

  const isToggleInfo = () => {
    setIsInfo(!isInfo);
  };

  return (
    <>
      <div className="makeup-div">
        <div onClick={isToggleInfo}>
          <img src={modeItem.img} alt="img" />
        </div>
        {isInfo && <GalleryInfo isInfo={isInfo} makeupId={modeItem.id} />}
        {isInfo && <BlackOut onClickEvent={isToggleInfo} />}
      </div>
    </>
  );
};

export default ProfileGalleryItem;