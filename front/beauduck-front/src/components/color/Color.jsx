import './Color.style.scss';
import { useState } from 'react';
import { SketchPicker } from 'react-color';

const Color = ({ propFunction }) => {
  const [background, setBackground] = useState('#fff');

  const handleChangeComplete = (color) => {
    setBackground(color.hex);
    submitColor();
  };

  const submitColor = () => {
    propFunction(background);
  };

  return (
    <div className="color-picker">
      <SketchPicker color={background} onChange={handleChangeComplete} />
    </div>
  );
};

export default Color;
