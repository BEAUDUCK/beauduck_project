import TabButton from '../components/button/TabButton';

const CommunityPage = () => {
  return (
    <div className="container">
      <h1>쑥덕쑥덕</h1>
      <p>자유롭게 정보를 공유하고 질문을 등록하세요.</p>
      <TabButton text={'정보게시판'} />
      <TabButton text={'질문게시판'} />
    </div>
  );
};

export default CommunityPage;
