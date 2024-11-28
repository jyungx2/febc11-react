import { useEffect } from "react";
import { useSelector } from "react-redux"; // 🍓 react 전용 훅을 쓰면 더 간단!

function Left3() {
  useEffect(() => {
    console.log("      # Left3 렌더링.");
  });

  // 🍓 redux
  // useSelector(): 상태값 추출(자동으로 구독이 됨)
  // store에 저장해놓은 state 값에서 count값만 뽑아서 쓰겠다.
  // const count = useSelector((state) => state.count);
  const state = useSelector((state) => state);

  return (
    <div>
      <h3>Left3</h3>
      {/* <span>{state.count}</span> */}
      <span>{state.count}</span>
    </div>
  );
}

export default Left3;
