import { useEffect } from 'react';
import { useState } from 'react';
import Paging from '../../components/pagination/Paging';
import BoardListItem from './BoardListItem';

const BoardList = ({ allList, isInfo }) => {
  const [currentPosts, setCurrentPosts] = useState(allList); // 보여줄 게시글
  const [page, setPage] = useState(1); // 현재 페이지
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(5);
  const indefOfLastPost = page * postPerPage;
  const indefOfFirstPost = indefOfLastPost - postPerPage;

  useEffect(() => {
    setCurrentPosts(allList.slice(indefOfFirstPost, indefOfLastPost));
  }, [indefOfFirstPost, indefOfLastPost, page, allList]);

  return (
    <div>
      <div className={['board-list', 'board-header'].join(' ')}>
        <p>번호</p>
        <p className="board-title">제목</p>
        <p>작성자</p>
        <p>조회</p>
        <p>좋아요</p>
      </div>
      {currentPosts.map((item) => (
        <BoardListItem
          idx={(page - 1) * postPerPage + currentPosts.indexOf(item)}
          key={item.id}
          boardItem={item}
          isInfo={isInfo}
        />
      ))}
      <Paging
        totalCount={allList.length}
        page={page}
        postPerPage={postPerPage}
        pageRangeDisplayed={5}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default BoardList;
