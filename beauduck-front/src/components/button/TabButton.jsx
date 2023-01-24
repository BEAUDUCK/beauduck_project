const TabButton = ({ text, onClick, addClass }) => {
  return (
    <button
      type="button"
      className={['tab-btn', `${addClass}`].join(' ')}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default TabButton;
