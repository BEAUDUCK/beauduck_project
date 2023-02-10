import { useState } from 'react';

const MyGalleryList = ({ myGalleryList }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="gallery">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '공개' : '비공개'}
      </button>
      {isOpen ? (
        <div>
          {myGalleryList?.map((item) => (
            <img src={item.img} key={item.id} alt="" className="gallery-pic" />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyGalleryList;
