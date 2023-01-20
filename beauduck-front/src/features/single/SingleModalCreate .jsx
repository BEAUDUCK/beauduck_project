import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/button/Button';

const SingleModalCreate = () => {
  return (
    <div className="makeup-create-modal">
      <div className="modal-header">
        <p></p>
        <h3>새 메이크업 만들기</h3>
        <FontAwesomeIcon icon="xmark" className="xmark" />
      </div>
      <form className="makeup-form">
        <div>
          <label htmlFor="title">이름</label>
          <input type="text" id="title" />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <input className="input-content" type="text" id="content" />
        </div>
        {/* 소요시간 어떻게 입력받을까? */}

        <div>
          <label htmlFor="time">소요시간</label>
          <input className="input-time" type="number" id="time" />
          <p>분</p>
        </div>
        {/* 메이크업 과정 */}
        <div>makeup</div>
        <Button text={'완료'} />
      </form>
    </div>
  );
};

export default SingleModalCreate;
