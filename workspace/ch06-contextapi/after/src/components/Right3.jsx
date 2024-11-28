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

  // CounterContext 구독 -> CounterContext의 상태변경이 Right3의 리렌더링을 유발함
  // 실질적으로 count라는 값을 가져와서 쓰진 않지만, count 상태를 관리하는 함수를 가져와서 쓰기 때문에 당연히 자동으로 count상태값이 바뀌므로 count값을 꺼내쓰는 Left3도 같이 렌더링됨. count를 쓰지 않아도 어쨌든 같은 객체로 묶였기 때문에 객체가 업데이트된 꼴 -> count 제외 다른 함수들을 꺼내쓰는 Right3 컴포넌트도 리렌더링.
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
