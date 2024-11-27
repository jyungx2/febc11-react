import Right2 from "@components/Right2";
import PropTypes from "prop-types";
import { useEffect } from "react";

Right1.proptypes = {
  countDown: PropTypes.func,
  reset: PropTypes.func,
  countUp: PropTypes.func.isRequired,
};

function Right1({ countUp, reset, countDown }) {
  useEffect(() => {
    console.log("  # Right1 렌더링.");
  });
  return (
    <div>
      <h1>Right1</h1>
      <Right2 countUp={countUp} reset={reset} countDown={countDown} />
    </div>
  );
}

export default Right1;
