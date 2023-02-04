import frame from '../../assets/content3.png';

const SingleModeSequence = ({ nowStep }) => {
  return (
    <div className="makeup-sequence">
      <img src={frame} alt="frame" className="content-box" />
      <img
        src={`/images/makeup/sub/sub_${nowStep.step}.png`}
        alt="nowStep.step"
        className="sub-ing-img"
      />
      <div className="sub-step-content">{nowStep.content}</div>
    </div>
  );
};

export default SingleModeSequence;
