import { useState, useReducer, useEffect } from "react";
import Button from "./Button";
import PropTypes from "prop-types";

Counter.propTypes = {
  children: PropTypes.string,
};

// children = "0" : undefined..
function Counter({ children = "0" }) {
  const initCount = Number(children);

  // 🔑 countDispatch: counterReducer 함수를 호출할 수 있는 대리함수 - state 매개변수를 넣어줄 수 없고, useReducer()보고 state를 관리하라고 시킨 상태이므로, counterReducer()를 직접 호출 못하기 때문에 필요 -> 상태 관리를 useReducer()한테 맡기고, 우리는 액션만 전달해주는 꼴!
  // const [count, setCount] = useState(initCount);
  const [count, countDispatch] = useReducer(counterReducer, initCount);
  const [step, setStep] = useState(1);

  const handleDown = () => {
    // setCount(count - step);
    // counterDispatch라는 대리함수에 액션 정보만 담긴 객체만 전달해주어 상태관리를 맡기자!
    // 💥 여기서는 로직 자체가 너무 간단해서 코드가 오히려 길어졌지만, 복잡한 애플리케이션 로직에서는 굉장히 유용하다!!
    countDispatch({ type: "DOWN", value: step });
  };

  const handleUp = () => {
    // setCount(count + step);
    countDispatch({ type: "UP", value: step });
  };

  const handleReset = (event) => {
    // setCount(initCount);
    countDispatch({ type: "RESET", value: initCount });
  };

  // ✅ 마운트 된 후에 최초 한번만 값 증가
  useEffect(() => {
    setTimeout(() => {
      handleUp();
    }, 1000);
    console.log(
      "dependencies에 빈 배열을 지정하면 컴포넌트가 마운트된 후에 한번만 호출됨 (업데이트 후에는 호출되지 않음)"
    );
  }, []);

  return (
    <div id="counter">
      <label htmlFor="step">증감치</label>
      <input
        type="number"
        style={{ width: "40px" }}
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <Button color="red" onClick={handleDown}>
        -
      </Button>
      <Button onClick={handleReset}>{initCount}</Button>
      <Button color="blue" onClick={handleUp}>
        +
      </Button>
      <span>{count}</span>
    </div>
  );
}

// 🔑 useReducer(): 현재 상태와 action 객체를 받아서 "새로운 상태"를 반환하는 순수 함수
// : 로직을 컴포넌트 내부에서 직접 구현하지 않고, 외부에서 구현..!

// 📌state: 이전 상태(useReducer가 내부적으로 관리, 이전의 리턴값이 다음의 state로 전달 -> newState => state)
// ex) 1 👉 단순 넘버일 때는 깊은복사가 필요없지만 객체라면 새로운 주소를 가지도록 복사해야함!

// 📌action: 동작을 정의하는 객체... 내가 지정하는 값(일반적으로 Type 속성에 동작을, value 속성에 값을 지정)
// ex) {type: 'UP', value: 1}

// 📌리턴값: 기존의 메모리주소를 갖지 않는 완전히 새로운 상태의 값
function counterReducer(state, action) {
  let newState;

  switch (action.type) {
    case "DOWN":
      newState = state - action.value;
      break;

    case "UP":
      newState = state + action.value;
      break;

    case "RESET":
      newState = action.value;
      break;

    default:
      newState = state;
  }

  return newState;
}

export default Counter;
