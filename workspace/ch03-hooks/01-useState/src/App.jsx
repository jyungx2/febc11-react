import { useState } from "react";

function App() {
  // 상태 관리
  const [text, setText] = useState("");

  return (
    <>
      <h1>01 useState - 상태 관리</h1>
      <div>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <br />
        <span>입력 메세지: {text}</span>
      </div>
    </>
  );
}

export default App;
