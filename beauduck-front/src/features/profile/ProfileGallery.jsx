import ProfileGalleryList from './ProfileGalleryList';

const ProfileGallery = () => {
  const GalleryList = [
    {
      img: 'https://i.pinimg.com/236x/b7/74/29/b77429e9fac0fd3efde42b8f66aa0721.jpg',
    }
  ];
  
  return (
    <div> 
      <ProfileGalleryList modeList={GalleryList} />
    </div>
  );
};

export default ProfileGallery;