import { useReducer, useRef } from "react";
import Button from "./Button";
import PropTypes from "prop-types";

Counter.propTypes = {
  children: PropTypes.string,
};

// children = "0" : undefined..
function Counter({ children = "0" }) {
  const initCount = Number(children);

  const [count, countDispatch] = useReducer(counterReducer, initCount);
  // const [step, setStep] = useState(1);
  const step = useRef(1); // 🌸 {current: 1} 반환
  const stepElem = useRef(null); // 🌸 DOM 객체

  // 🌸 value: step -> step.current
  const handleDown = () => {
    countDispatch({ type: "DOWN", value: step.current });
    stepElem.current.focus();
  };

  const handleUp = () => {
    // setCount(count + step);
    countDispatch({ type: "UP", value: step.current });
    stepElem.current.focus();
  };

  const handleReset = (event) => {
    // setCount(initCount);
    countDispatch({ type: "RESET", value: initCount });
    stepElem.current.focus();
  };

  return (
    <div id="counter">
      <label htmlFor="step">증감치</label>
      {/* 제어 컴포넌트 value, onChange 사용 ---> value={step} 없앰 ---> 비제어 컴포넌트로 변경!*/}
      {/* setStep(Number(e.target.value)) -> step.current = Number(e.target.value) */}
      {/* 1️⃣ 상태값
      // step 상태가 바뀔 때, 화면이 리렌더링될 필요는 없다! ... 실제로 리렌더링 되진 않지만, virtual DOM에 쓸 필요 조차없다..? => -,+,리셋버튼을 눌렀을 때만 리렌더링될 필요있기 때문에 useRef() 훅을 사용 */}

      {/* 2️⃣ React에서는 리얼 DOM에 접근해서 작업하는 게 아닌, 버츄얼 돔을 써야 한다... document.querySelector()을 아예 사용하면 안된다!!
      // ❌ 잘못된 예시
      const stepElem = document.querySelector('#step');
      stepElem.focus();
      대신에, input요소에 ref속성을 useRef()해놓은 밸류로 지정해주어 인풋요소 자체가 리얼 돔객체가 된 것마냥 사용하도록 하자!!
       */}
      <input
        type="number"
        style={{ width: "40px" }}
        defaultValue={step.current}
        onChange={(e) => (step.current = Number(e.target.value))}
        ref={stepElem}
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
