import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Member from './features/member/Member';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Member />} />
      </Routes>
    </div>
  );
}

export default App;
