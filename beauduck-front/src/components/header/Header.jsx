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

  return (
    <nav className="header">
      <div class="header-name"
      onClick={() => navigate('/')}>
        <img className="header-logo" src={logo} alt="logo" />
        <h3>뷰덕</h3>
      </div>
      <ul className="header-menu">
        {/* <p onClick={() => navigate('/help')}>도와덕</p>
        <p onClick={() => navigate('/single')}>따라해덕</p>
        <p onClick={() => navigate('/together')}>투게덕</p>
        <p onClick={() => navigate('/board')}>쑥덕쑥덕</p>*/}
        <li onClick={() => navigate('/no')}>도와덕</li>
        <li onClick={() => navigate('/no')}>따라해덕</li>
        <li onClick={() => navigate('/no')}>투게덕</li>
        <li onClick={() => navigate('/no')}>쑥덕쑥덕</li>
      </ul>
      <ul className="header-auth">
        <li onClick={() => navigate('/profile')}>
          <FontAwesomeIcon className="user-icon" icon="fa-regular fa-user"/>
        </li>
        <li className="header-not-auth">
            {!memberId ? <LoginModal /> : <LogoutModal />}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
