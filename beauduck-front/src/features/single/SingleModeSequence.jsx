// import frame from '../../assets/content3.png';

const SingleModeSequence = ({ nowStep }) => {
  const colors = {
    suncream: '#BFD3E3',
    foundation: '#E7D4BC',
    powder: '#CCC9E5',
    eyebrow: '#C7CBCF',
    browmascara: '#F4DECA',
    eyeliner: '#CDCADD',
    eyeshadow: '#BEB6BD',
    mascara: '#D8ADC2',
    curler: '#CDD4E5',
    shading: '#D0C3BB',
    blusher: '#F9E4EF',
    lipstick: '#ECE2CD',
    lipgloss: '#ECBBB3',
    tint: '#F2C8D0',
  };

  const step = nowStep.step;

  return (
    <div className="makeup-sequence">
      {/* <img src={frame} alt="frame" className="content-box" /> */}
      <div
        className="sub-step-content"
        style={{ backgroundColor: colors[step] }}
      >
        <img
          src={`/images/makeup/sub/sub_${step}.png`}
          alt="step"
          className="sub-ing-img"
        />
        {nowStep.content}
      </div>
    </div>
  );
};

export default SingleModeSequence;
