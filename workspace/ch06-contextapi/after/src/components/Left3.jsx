import CounterContext from "@context/CounterContext";
import PropTypes from "prop-types";
import { useContext, useEffect } from "react";

function Left3() {
  useEffect(() => {
    console.log("      # Left3 렌더링.");
  });

  // CounterContext 구독 -> CounterContext의 상태변경이 Left3의 리렌더링을 유발함
  const {
    state: { count },
  } = useContext(CounterContext);

  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
    </div>
  );
}

export default Left3;
