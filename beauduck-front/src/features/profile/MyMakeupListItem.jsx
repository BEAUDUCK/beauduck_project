const MyMakeupListItem = ({ makeup }) => {
  return (
    <div className="makeup-item">
      <img src={makeup.img} alt="" />
      <p>{makeup.title}</p>
      <button>START</button>
    </div>
  );
};

export default MyMakeupListItem;
