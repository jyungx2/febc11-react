import { useEffect } from "react";
import { useSelector } from "react-redux"; // 🍓 react 전용 훅을 쓰면 더 간단!

function Left3() {
  useEffect(() => {
    console.log("      # Left3 렌더링.");
  });

  // 🍓 redux
  // useSelector(): 상태값 추출(셀렉터 훅으로 스토어 접근 - 자동으로 구독이 됨)
  // store에 저장해놓은 state 값에서 count값만 뽑아서 쓰겠다.
  // const count = useSelector((state) => state.count);

  // ❓✍🏼 state 통째로 구독 - state에 있는 여러 속성의 값이 필요할 때 - 하지만 이때, 사용하지 않는 속성의 값이 바껴도, 이 Left3 컴포넌트 자체가 리렌더링됨 (불필요한 리렌더링) ... 사용하지도 않는 속성으로 인해 리렌더링 시키고 싶지 않다! 하면 위의 경우처럼 state.count이렇게 콕! 짚어서 꺼내야한다.
  // const state = useSelector((state) => state);

  // 🍓 redux-toolkit
  const count = useSelector((state) => state.counterStore.count);

  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
      {/* <span>{state.count}</span> */}
    </div>
  );
}

export default Left3;
