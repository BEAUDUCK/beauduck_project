import './Help.style.scss';
import ConsultingListItem from '../help/ConsultingListItem';

// 클릭하면 참가하기 등장하자
const ConsultingList = ({ consultingList }) => {
  return (
    <div className="consulting-list">
      <div className="consulting-list-child">
        {consultingList.map((item) => (
          <ConsultingListItem key={item.id} consultingItem={item} />
        ))}
      </div>
    </div>
  );
};

export default ConsultingList;
