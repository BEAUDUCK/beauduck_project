import './Help.style.scss';
import ConsultingListItem from '../help/ConsultingListItem';

// 클릭하면 참가하기 등장하자
const ConsultingList = ({ consultingList }) => {
  return (
    <div className='consulting-list'>
      {consultingList.map((item) => (
        <ConsultingListItem key={item.id} consultingItem={item} />
      ))}
    </div>
  );
};

export default ConsultingList;
