const ConsultingListItem = ({ consultingItem }) => {
  return (
    <div className="consulting-div">
      <div className="consulting-first">
        {/* 이미지는 무엇을 넣더라 ? 랜덤 이미지 ? */}
        <p>{consultingItem.host}</p>
      </div>
      <div className="consulting-second">
        <p>{consultingItem.title}</p>
        <p>{consultingItem.text}</p>
      </div>
    </div>
  );
};

export default ConsultingListItem;
