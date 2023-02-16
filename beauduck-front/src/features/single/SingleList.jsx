import './Single.style.scss';
import SingleListItem from './SingleListItem';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Paging from '../../components/pagination/Paging';
import { useEffect, useState } from 'react';

const SingleList = ({ modeList }) => {
  const [currentPosts, setCurrentPosts] = useState(); // 보여줄 게시글
  const [page, setPage] = useState(1); // 현재 페이지
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(8);
  const indefOfLastPost = page * postPerPage;
  const indefOfFirstPost = indefOfLastPost - postPerPage;

  useEffect(() => {
    setCurrentPosts(modeList.slice(indefOfFirstPost, indefOfLastPost));
  }, [indefOfFirstPost, indefOfLastPost, page, modeList]);

  useEffect(() => {
    setPage(1);
  }, [modeList]);

  return (
    <>
      <h1 className="modeList-h1">MAKEUP LIST</h1>
      <div className="modeList">
        {currentPosts?.map((item, idx) => (
          <SingleListItem key={item.id} modeItem={item} idx={idx + 1} />
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
