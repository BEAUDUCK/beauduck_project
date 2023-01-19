import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import CommunityPage from './pages/CommunityPage';
import CommunityWritePage from './pages/CommunityWritePage';
import ConsultingPage from './pages/ConsultingPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFount';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import SinglePage from './pages/SinglePage';
import TogetherPage from './pages/TogetherPage';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faBattery } from '@fortawesome/free-solid-svg-icons';
import { faBatteryQuarter } from '@fortawesome/free-solid-svg-icons';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';


library.add(faXmark);
library.add(faBattery);
library.add(faBatteryQuarter);
library.add(faCircleChevronLeft);

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* 도와덕 */}
          <Route path="/help" element={<ConsultingPage />} />
          {/* 따라해덕 */}
          <Route path="/single" element={<SinglePage />} />
          {/* 투게덕 */}
          <Route path="/together" element={<TogetherPage />} />
          {/* 쑥덕쑥덕 */}
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/write" element={<CommunityWritePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
