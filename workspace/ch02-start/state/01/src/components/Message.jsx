import { useState } from "react";

// 모듈 스코프 변수 ❌
// state 시스템 없이, 모듈 스코프 변수를 써도 동작은 잘 한다!
// 근데 만약 App.jsx(부모 컴포넌트)에서 이 컴포넌트를 두개 이상 쓴다고 하면,
// 이 두가지 자식 컴포넌트는 count 변수를 공유하기 때문에, 독립적으로 구분되는 것이 아니라, 밸류가 자식 요소들끼리 연결이 된다... => 리액트 프로젝트에서 컴포넌트 내에 있는 하나의 변수, 상태를 관리하기 위해서는 지역변수나 모듈 스코프 변수가 아닌, state 시스템을 사용해야 한다!
// let count = 0;

export default function Message() {
  console.log("메시지 렌더링");

  // 지역변수 ❌
  // let count = 0;

  // state 사용 ✅
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("");

  const handleChange = (event) => {
    const inputMsg = event.target.value;
    setMsg(inputMsg);
    setCount(count + 1);
    // count++;
  };

  return (
    <div>
      <input type="text" value={msg} onChange={handleChange} />
      <br />
      <span>입력 메시지: {msg}</span>
      <br />
      <span>입력 횟수: {count} </span>
    </div>
  );
}
