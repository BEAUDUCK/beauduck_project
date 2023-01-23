import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Pagination.style.scss';

const Paging = ({
  totalCount,
  postPerPage,
  pageRangeDisplayed,
  handlePageChange,
  page,
}) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={postPerPage}
      totalItemsCount={totalCount ? totalCount : 0}
      pageRangeDisplayed={pageRangeDisplayed}
      prevPageText={
        <FontAwesomeIcon className="one-step" icon="fa-solid fa-caret-left" />
      }
      nextPageText={
        <FontAwesomeIcon className="one-step" icon="fa-solid fa-caret-right" />
      }
      firstPageText={<FontAwesomeIcon icon="fa-solid fa-backward" />}
      lastPageText={<FontAwesomeIcon icon="fa-solid fa-forward" />}
      onChange={handlePageChange}
    />
  );
};

export default Paging;
