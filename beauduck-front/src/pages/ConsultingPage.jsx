import Banner from "../components/banner/Banner";
import ConsultingList from "../features/help/ConsultingList";

const ConsultingPage = () => {
  const TestList = [
    {
      id: 1,
      title: "하하하",
      text: "하이하이하이하이하이",
      host: "나님",
      status: "진행 중", 
    },
    {
      id: 2,
      title: "키키키",
      text: "안녕안녕안녕안녕",
      host: "나야나",
      status: "모집 중", 
    },
    {
      id: 3,
      title: "룰루",
      text: "어서오세요 빨리오세요 제발오세요",
      host: "룰루",
      status: "모집 중", 
    }
  ]

  return (
    <>
      <Banner bannerStyle={"help-ban"}/>
      <div className="container">
        <h2>진행 중인 컨설팅</h2>
        <ConsultingList consultingList={TestList}/>
      </div>
    </>
  );
};

export default ConsultingPage;
