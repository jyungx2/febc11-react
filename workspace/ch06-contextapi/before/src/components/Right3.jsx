import PropTypes from "prop-types";
import { useEffect } from "react";

Right3.proptypes = {
  countDown: PropTypes.func,
  reset: PropTypes.func,
  countUp: PropTypes.func,
};

function Right3({ countUp, reset, countDown }) {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });
  return (
    <div>
      <h3>Right3</h3>
      <button
        onClick={() => {
          countDown(1);
        }}
      >
        -1
      </button>
      <button
        onClick={() => {
          reset();
        }}
      >
        0
      </button>
      <button
        onClick={() => {
          countUp(1);
        }}
      >
        +1
      </button>
    </div>
  );
}

export default Right3;
