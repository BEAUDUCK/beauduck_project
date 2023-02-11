import './InfoPage.style.scss';

const InfoPage = () => {
  return (
    <div className="container">
      <h1>퍼스널 컬러</h1>
      <p>사람의 피부톤과 가장 어울리는 색상을 찾는 색채학 이론</p>
      <p>피부톤에 어울리는 색을 웜톤 쿨톤이나 봄, 여름, 가을, 겨울로 나눔</p>
      <p>어떤 색조 화장품이나 옷, 장신구가 어울리는지를 찾기 위해 주로 사용</p>

      <p>본인에게 어떤 색이 베스트, 워스트인지 알고 싶을 때 이용하면 좋다.</p>
      <p>주의해야 할 것은 어디까지나 과학적인 이론이 아니라는 점이다. </p>
      <div className="personal-color">
        <img src="/images/personal/spring1.png" alt="" />
        <img src="/images/personal/spring2.png" alt="" />
        <img src="/images/personal/summer1.png" alt="" />
        <img src="/images/personal/summer2.png" alt="" />
        <img src="/images/personal/summer3.png" alt="" />
        <img src="/images/personal/autumn1.png" alt="" />
        <img src="/images/personal/autumn2.png" alt="" />
        <img src="/images/personal/autumn3.png" alt="" />
        <img src="/images/personal/winter1.png" alt="" />
        <img src="/images/personal/winter2.png" alt="" />
      </div>
    </div>
  );
};

export default InfoPage;
