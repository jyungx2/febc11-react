import { useState } from "react";
import "./App.css";

function App() {
  const [position, setPosition] = useState({ x: 100, y: 100 });

  return (
    <>
      <h1>03 상태관리 대상이 객체일 경우 주의 사항</h1>
      <div
        onPointerMove={(event) => {
          // 속성을 직접 수정하더라도 상태는 변경되지 않는다..
          // 리액트는 얕은 복사만 하는데, 이 얕은 복사로는 객체의 메모리주소가 동일하게 유지 되기 때문에 ...(spread operator)를 이용해 아예 새로운 객체를 생성하여 setter function에 전달해줘야 한다. (=> 객체의 주소가 바껴야 되고, 객체의 속성만 바뀌는 것은 리액트가 리렌더링할 필요 없다고 느낌!!)
          // 🍀
          // position.x = event.clientX;
          // position.y = event.clientY;
          // setPosition({ ...position });
          // console.log(position);

          const newPosition = { x: event.clientX, y: event.clientY - 80 };
          setPosition(newPosition);
        }}
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: "red",
            borderRadius: "50%",
            transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
            left: -10,
            top: -10,
            width: 20,
            height: 20,
          }}
        />
      </div>
    </>
  );
}

export default App;
