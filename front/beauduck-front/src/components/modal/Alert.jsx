import Button from '../button/Button';

const Alert = ({ text, onClickEvent }) => {
  return (
    <div className="custom-alert">
      <p>{text}</p>
      <Button
        text={'확인'}
        onClickEvent={onClickEvent}
        btnStyle={'alert-btn'}
      />
    </div>
  );
};

export default Alert;
