import React from "react";

const AnswerComponent = ({ handleDecrease, handleIncrease }) => {

  return (
    <div className="answercomponent">
      <button onClick={() => handleIncrease}>잘어울려요~</button>
      <button onClick={() => handleDecrease}>안어울려요~</button>
    </div>
  )
};

export default AnswerComponent;