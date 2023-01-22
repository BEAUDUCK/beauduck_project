import { useState } from 'react';
import TabButton from '../components/button/TabButton';
import './Board.style.scss';

const BoardWritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="container">
      <form className="write-form">
        <h2>글쓰기</h2>
        <hr />
        <TabButton text={'정보게시판'} />
        <TabButton text={'질문게시판'} />
        <br />
        <input
          className="input-title"
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="input-content"
          placeholder="내용을 입력하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
    </div>
  );
};

export default BoardWritePage;
