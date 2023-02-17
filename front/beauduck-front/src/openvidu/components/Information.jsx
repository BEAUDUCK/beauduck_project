import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Information = ({ exitInfo, hostNickname }) => {
  return (
    <div className="information">
      <FontAwesomeIcon
        icon="fa-solid fa-xmark"
        onClick={exitInfo}
        className="exit-icon"
      />
      <div>
        <h1>{hostNickname}님이 시작 버튼을 누르면 진단이 시작됩니다.</h1>
        <h1>
          정확한 결과를 기다리는 {hostNickname}님을 위해 신중하게 버튼을
          눌러주세요!
        </h1>
      </div>
    </div>
  );
};

export default Information;
