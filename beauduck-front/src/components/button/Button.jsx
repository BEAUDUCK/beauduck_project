import './Button.style.scss';

const Button = ({ btnStyle, text, onClickEvent }) => {
  return (
    <button className={["normal-btn", `${btnStyle}`].join(" ")} text={text} onClick={() => onClickEvent()}>
      {text}
    </button>
  );
};

export default Button;
