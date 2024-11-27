import Right3 from "@components/Right3";
import PropTypes from "prop-types";
import { useEffect } from "react";

// Right2.proptypes = {
//   countDown: PropTypes.func,
//   reset: PropTypes.func,
//   countUp: PropTypes.func.isRequired,
// };

function Right2() {
  useEffect(() => {
    console.log("    # Right2 렌더링.");
  });
  return (
    <div>
      <h2>Right2</h2>
      <Right3 />
    </div>
  );
}

export default Right2;
