import './Modal.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../button/Button';

const ExitModal = ({ title, content, btnText }) => {
  return (
    <div className="exit-modal">
      <div>
        <p className="exit-title">{title}</p>
        <FontAwesomeIcon icon="xmark" />
      </div>
      <p className="exit-content">{content}</p>
      <Button text={btnText} />
    </div>
  );
};

export default ExitModal;
