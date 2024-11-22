import { useState } from "react";

// 카운터함수(카운트 증감)을 여러 컴포넌트에서 써야 한다면, 이런 식으로 훅을 만들어서 공통적으로 사용
function useCounter(initCount) {
  const [count, setCount] = useState(initCount);

  const handleDown = (num) => {
    setCount(count - num);
  };

  const handleUp = (num) => {
    setCount(count + num);
  };

  const handleReset = (num) => {
    setCount(num);
  };

  return { count, down: handleDown, up: handleUp, reset: handleReset };
}

export default useCounter;
