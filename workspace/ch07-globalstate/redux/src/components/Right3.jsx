import counterActionCreator from "@redux/counterActionCreator";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Right3() {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });

  // 🍓 redux
  // useDispatch(): 상태값 수정
  // dispatch 함수 꺼내옴
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Right3</h3>
      {/* <button
        onClick={() => dispatch({ type: "CountUP", payload: { step: 2 } })}
      >
        +2
      </button> */}
      <button onClick={() => dispatch(counterActionCreator.countUP(2))}>
        +2
      </button>
      <button onClick={() => dispatch(counterActionCreator.countDOWN(2))}>
        -2
      </button>
      <button onClick={() => dispatch(counterActionCreator.countReset())}>
        reset
      </button>
    </div>
  );
}

export default Right3;
