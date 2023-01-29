import './Modal.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../button/Button';

const ExitModal = ({ title, content, btnText, where, whereText }) => {
  return (
    <div className="exit-modal">
      <div className="modal-header">
        <p className="exit-title">{title}</p>
        <FontAwesomeIcon icon="xmark" className="xmark" />
      </div>
      <p className="exit-content">
        {content.split('\n').map((text) => (
          <>
            {text} <br />
          </>
        ))}
      </p>
      {btnText && <Button text={btnText} />}
      <a href={where}>{whereText}</a>
    </div>
  );
};

export default ExitModal;
