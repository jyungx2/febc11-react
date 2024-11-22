import { useRef } from "react";
import Button from "./Button";
import PropTypes from "prop-types";
// 커스텀 훅 사용 (useReducer/useCallback/useState/useRef.... 모든 리액트 내장 훅을 이용해 여러 컴포넌트에서 공통으로 사용할 수 있는 상태 관리나 사이드 이펙트 로직을 재사용할 수 있도록 만든 함수)
import useCounter from "../hooks/useCounter";

Counter.propTypes = {
  children: PropTypes.string,
};

// children = "0" : undefined..
function Counter({ children = "0" }) {
  const initCount = Number(children);
  const step = useRef(1); // 🌸 {current: 1} 반환
  const { count, up, down, reset } = useCounter(initCount);

  // focus() 안 할것.
  // const stepElem = useRef(null); // 🌸 DOM 객체

  return (
    <div id="counter">
      <label htmlFor="step">증감치</label>
      <input
        type="number"
        style={{ width: "40px" }}
        defaultValue={step.current}
        onChange={(e) => (step.current = Number(e.target.value))}
      />
      <Button color="red" onClick={() => down(step.current)}>
        -
      </Button>
      <Button onClick={() => reset(step.current)}>{initCount}</Button>
      <Button color="blue" onClick={() => up(step.current)}>
        +
      </Button>
      <span>{count}</span>
    </div>
  );
}

export default Counter;
