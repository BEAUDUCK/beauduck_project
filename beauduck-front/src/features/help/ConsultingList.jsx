import './Help.style.scss';
import ConsultingListItem from '../help/ConsultingListItem';

const ConsultingList = ({ consultingList }) => {
  return (
    <div className="consulting-list">
      <div className="consulting-list-child">
        {consultingList.map((item) => (
          <ConsultingListItem key={item.roomId} consultingItem={item} />
        ))}
      </div>
    </div>
  );
};

export default ConsultingList;
