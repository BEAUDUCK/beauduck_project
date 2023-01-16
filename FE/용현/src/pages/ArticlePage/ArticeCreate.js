import { useState } from "react";
import './Article.css';
import Button from "../../components/Button"

const ArticleCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const writer = 'yong';

  return (
    <div>
      <h2>새로운 글 작성하기</h2>
      <form>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
        <textarea value={content} onChange={e => setContent(e.target.value)} />
        <Button text={"제출"} />
      </form>
    </div>
  )
};

export default ArticleCreate;