import { useNavigate } from 'react-router-dom';
import './Header.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo_original.png';
import { useState } from 'react';
import LoginModal from '../../features/login/LoginModal';
import LogoutModal from '../../features/login/LogoutModal';
import { useSelector } from 'react-redux';
import SignupPage from '../../pages/SignupPage';

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('refreshToken');
  const { memberId } = useSelector((state) => state.member);

  const [isOpen, setIsOpen] = useState(false);
  const isOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const [isOpen2, setIsOpen2] = useState(false);
  const isOpenModal2 = () => {
    setIsOpen2(!isOpen2);
  };

  return (
    <div className="header">
      <div className="header-content">
        <div onClick={() => navigate('/')}>
          <img className="header-logo" src={logo} alt="logo" />
          <h3 className="logo-name">뷰덕</h3>
        </div>
        <div className="header-nav">
          {/* <p onClick={() => navigate('/help')}>도와덕</p>
          <p onClick={() => navigate('/single')}>따라해덕</p>
          <p onClick={() => navigate('/together')}>투게덕</p>
          <p onClick={() => navigate('/board')}>쑥덕쑥덕</p>
          <p onClick={() => navigate('/rank')}>랭킹</p> */}
          <p onClick={() => navigate('/no')}>도와덕</p>
          <p onClick={() => navigate('/no')}>따라해덕</p>
          <p onClick={() => navigate('/no')}>투게덕</p>
          <p onClick={() => navigate('/no')}>쑥덕쑥덕</p>
          <p onClick={() => navigate('/no')}>랭킹</p>
        </div>
        <div className="header-auth">
          <p onClick={() => navigate('/profile')}>
            <FontAwesomeIcon className="user-icon" icon="fa-regular fa-user" />
          </p>
          <div className="header-auth-not">
            {!memberId ? <LoginModal /> : <LogoutModal />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
