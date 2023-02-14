const MyMakeupListItem = ({ makeup }) => {
  const [isInfo, setIsInfo] = useState(false);

  const isToggleInfo = () => {
    setIsInfo(!isInfo);
  };

  return (
    <>
      <div className="makeup-item">
        <img src={makeup.img} alt="" />
        <p>{makeup.title}</p>
        <button onClick={isToggleInfo}>START</button>
      </div>
      {isInfo && (
        <SingleModalInfo makeupId={modeItem.id} isToggleInfo={isToggleInfo} />
      )}
      {isInfo && <BlackOut onClickEvent={isToggleInfo} />}
    </>
  );
};

export default MyMakeupListItem;
