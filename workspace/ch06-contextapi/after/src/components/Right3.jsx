import CounterContext from "@context/CounterContext";
import { SimpleContext } from "@context/SimpleContext";
import PropTypes from "prop-types";
import { useContext, useEffect } from "react";

// Right3.proptypes = {
//   countDown: PropTypes.func,
//   reset: PropTypes.func,
//   countUp: PropTypes.func,
// };

function Right3() {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });

  // CounterContext
  const {
    actions: { countDown, reset, countUp },
    hello,
  } = useContext(CounterContext);

  // SimpleContext
  const simple = useContext(SimpleContext);

  return (
    <div>
      <h3>{hello}</h3>
      <h3>{simple.hello}</h3>
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
