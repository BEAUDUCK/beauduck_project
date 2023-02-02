import { useEffect, useState } from 'react';
import Paging from '../../components/pagination/Paging';
import ProfileGalleryItem from './ProfileGalleryItem';

const ProfileGallery = ({ modeList }) => {
  const [currentRooms, setCurrentRooms] = useState([]); 
  const [page, setPage] = useState(1); 
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(12);

  const indefOfLastRoom = page * postPerPage;
  const indefOfFirstRoom = indefOfLastRoom - postPerPage;

  useEffect(() => {
    setCurrentRooms(modeList.slice(indefOfFirstRoom, indefOfLastRoom));
  }, [indefOfFirstRoom, indefOfLastRoom, page]);

  return (
    <>
      <div className="modeList">
        {currentRooms.map((item) => (
          <ProfileGalleryItem key={item.id} modeItem={item} />
        ))}
      </div>
      <Paging
        totalCount={modeList.length}
        page={page}
        postPerPage={postPerPage}
        pageRangeDisplayed={5}
        handlePageChange={handlePageChange}
      />
    </>
  );
};


export default ProfileGallery;