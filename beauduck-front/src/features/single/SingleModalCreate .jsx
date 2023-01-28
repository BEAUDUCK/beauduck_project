import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/button/Button';

const SingleModalCreate = () => {
  const addSub = () => {
    const newSub = document.createElement('div');
    newSub.classList.add('sub-div');
    newSub.innerHTML = '<input type="text" />';

    const addSkin = document.getElementById('add-skin');
    addSkin.after(newSub);
  };
  const removeSub = (obj) => {
    document.getElementById('box').removeChild(obj.parentNode);
  };

  return (
    <div className="makeup-create-modal">
      <div className="modal-header">
        <p></p>
        <h3>새 메이크업 만들기</h3>
        <FontAwesomeIcon icon="xmark" className="xmark" />
      </div>
      <div className="makeup-form">
        <div className="makeup-element">
          <label htmlFor="title" className="total-label">
            이름
          </label>
          <input type="text" id="title" className="total-input" />
        </div>
        <div className="makeup-element">
          <label htmlFor="content" className="total-label">
            내용
          </label>
          <input
            className={['input-content', 'total-input'].join(' ')}
            type="text"
            id="content"
          />
        </div>
        <div className="makeup-element">
          <label htmlFor="time" className="total-label">
            소요시간
          </label>
          <input className="input-time" type="number" id="time" />
          <p>분</p>
        </div>
        {/* 메이크업 과정 */}
        <div className="makeup-process">
          <div id="add-skin" className="add-skin">
            <span className="add-main-text">피부</span>
            <div id="add-skin-sub" className="add-skin-sub">
              <div className="sub-div">
                <FontAwesomeIcon
                  icon="fa-solid fa-plus"
                  onClick={addSub}
                  className="plus-mark"
                />
                <form>
                  <select>
                    <option value="1">선크림</option>
                    <option value="2">파운데이션</option>
                    <option value="3">쿠션</option>
                    <option value="4">파우더</option>
                  </select>
                  <input type="color" />
                  <input
                    type="text"
                    className="add-sub-text"
                    placeholder="해당 과정에 대한 설명을 적어주세요"
                  />
                  <input type="file" id="file" accept="image/*" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <Button text={'완료'} />
      </div>
    </div>
  );
};

export default SingleModalCreate;
