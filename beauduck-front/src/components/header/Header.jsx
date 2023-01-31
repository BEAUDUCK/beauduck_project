import { useNavigate } from 'react-router-dom';
import './Header.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-content">
        <div>
          <h3 onClick={() => navigate('/')}>뷰덕</h3>
        </div>
        <div className="header-nav">
          <p onClick={() => navigate('/help')}>도와덕</p>
          <p onClick={() => navigate('/single')}>따라해덕</p>
          <p onClick={() => navigate('/together')}>투게덕</p>
          <p onClick={() => navigate('/board')}>쑥덕쑥덕</p>
        </div>
        <div className="header-auth">
          {/* onClick 이벤트 마이페이지로 라우팅 */}
          <FontAwesomeIcon className="user-icon" icon="fa-regular fa-user" />
          <p>LOGIN/SIGNUP</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
