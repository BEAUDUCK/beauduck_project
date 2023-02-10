import { useState } from 'react';
import MyGalleryListItem from './MyGalleryListItem';

const MyGalleryList = ({ myGalleryList }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <h1>내 갤러리</h1>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '공개' : '비공개'}
      </button>
      {isOpen ? (
        <div style={{ display: 'flex' }}>
          {myGalleryList?.map((it) => (
            <MyGalleryListItem key={it.id} img={it.img} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyGalleryList;
