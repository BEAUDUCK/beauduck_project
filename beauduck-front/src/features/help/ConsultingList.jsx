import './Help.style.scss';
import Button from "../../components/button/Button";
import ConsultingListItem from "../help/ConsultingListItem";
import ConsultingModalLoadingGuest from "./ConsultingModalLoadingGuest";
import ConsultingModalLoadingHost from "./ConsultingModalLoadingHost";
import ConsultingModalCreate from "./ConsultingModalCreate ";

// 클릭하면 참가하기 등장하자
const ConsultingList = ({consultingList}) => {
  return (
    <div>
      <Button text={'모집 중'}/>
      <Button text={'진행 중'}/>
      {consultingList.map((item) => (
        <ConsultingListItem key={item.id} consultingItem={item}/>
      ))}
      <ConsultingModalCreate />
      <ConsultingModalLoadingHost />
      <ConsultingModalLoadingGuest host={"Jack"}/>
    </div>
  )
};

export default ConsultingList;

