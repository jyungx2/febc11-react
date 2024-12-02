import { counterAtom } from "@jotai/atoms";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";

function Right3() {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });

  // getter & setter를 모두 사용(getter인 count 사용 - 자동으로 구독 - 신문 보지도 않는데 구독할 필요 없다. - count를 다른 방법으로 가져올 수 있음)
  // const [count, setCount] = useAtom(counterAtom);

  // const countUp = function (step) {
  //   setCount(count + step);
  // };
  // setter만 사용(구독하지 않음): 신문을 기고만 하고, 보지는 않는 것
  // ... setter만 피료한데 굳이 Getter까지 사용할 필요 없다. 불필요한 리렌더링 막아야한다
  // 라이브러리마다 이를 위한 방법이 존재 -> Jotai의 경우, useSetAtom()이라는 훅을 이용하면 되는 것. 이러면 count라는 상태값(getter)를 굳이 안가져와도, setCount로부터 현재 상태값을 가져올 수 있다.
  const setCount = useSetAtom(counterAtom);
  const countUp = function (step) {
    setCount((count) => count + step);
  };

  const countDown = function (step) {
    setCount((count) => count - step);
  };

  const reset = function () {
    setCount(0);
  };

  return (
    <div>
      <h3>Right3</h3>
      <button onClick={() => countDown(1)}>-1</button>
      <button onClick={() => reset()}>0</button>
      <button onClick={() => countUp(1)}>+1</button>
    </div>
  );
}

export default Right3;
