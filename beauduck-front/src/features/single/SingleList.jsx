import { useEffect, useState } from 'react';
import Paging from '../../components/pagination/Paging';
import './Single.style.scss';
import SingleListItem from './SingleListItem';

const SingleList = ({ modeList }) => {
  const [currentRooms, setCurrentRooms] = useState([]); // 보여줄 게시글
  const [page, setPage] = useState(1); // 현재 페이지
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
          <SingleListItem key={item.id} modeItem={item} />
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

export default SingleList;
