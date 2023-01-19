import { useCallback, useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';

const Color = () => {
  const [color, setColor] = useState('');
  const [label, setLabel] = useState('');

  //   useEffect(() => {
  //     if (!label.color) {
  //       setColor('');
  //     }
  //     setColor(label.color);
  //   }, [label]);

  const handleColorChange = useCallback(() => {
    setColor(color);
  }, [color]);

  return (
    <div>
      <input
        value={color}
        onChange={(e) => handleColorChange(e.target.value)}
        disableAlpha={true}
      />
      <ChromePicker
        color={color}
        onChange={(color) => handleColorChange(color.hex)}
      />
    </div>
  );
};

export default Color;
