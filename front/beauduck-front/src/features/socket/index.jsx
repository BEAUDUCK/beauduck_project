import { useEffect } from 'react';
import { useState } from 'react';
import SocketContext from './context';

const SocketProvider = (props) => {
  const [value, setValue] = useState({
    queueLength: 0,
    positionInLine: 0,
  });
  //   useEffect(() => initSockets({ setValue }), [initSockets]);

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
