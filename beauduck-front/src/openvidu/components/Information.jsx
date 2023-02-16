import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Information = ({ exitInfo }) => {
  return (
    <div className="information">
      <FontAwesomeIcon
        icon="fa-solid fa-xmark"
        onClick={exitInfo}
        className="exit-icon"
      />
      <p>안녕하세요</p>
    </div>
  );
};

export default Information;
