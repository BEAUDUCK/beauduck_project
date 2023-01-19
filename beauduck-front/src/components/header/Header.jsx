import { useNavigate } from 'react-router-dom';
import './Header.style.scss';

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
          <p onClick={() => navigate('/community')}>쑥덕쑥덕</p>
        </div>
        <div className="header-auth">
          <p>LOGIN/SIGNUP</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
