// import { Fragment } from "react";
import { useState } from "react";

function App() {
  // const로 변수 지정 -> 절대 바뀌지 않는다!!
  const [number, setNumber] = useState(0);

  return (
    <>
      <h2>02 이벤트 핸들러에서 State값을 여러번 변경했을 때 문제점</h2>
      <p>{number}</p>
      <button
        onClick={() => {
          console.log("클릭 시작", number); // 0

          // 📌 아래처럼 setter function의 인자로 단순히 연산식을 써주면 number 변수는 절대 바뀌지 않는 값이기 때문에, 의도한 대로 +3이 되지 않고, 마치 한번만 부른 것처럼 +1만 되어 나온다.
          // 호출되는 즉시 리렌더링이 되지 않고, 모아두었다가 한번에 업데이트(반영, 배치) 된다..
          setNumber(number + 1); // 0 + 1
          // setNumber(number + 1); // 0 + 1
          // setNumber(number + 1); // 0 + 1

          // 📌 setter 함수의 인자값으로 함수를 전달!
          // 콜백함수의 리턴값을 저장해 두었다가 다음에 호출되는 콜백함수의 인자로 전달
          // setter함수를 호출할 때마다 그 다음 함수 호출하기 전에 업데이트하고 싶다면, 이런 식으로 콜백함수를 직접 써준다.
          setNumber((num) => num + 1); // 0 + 1 = 1
          setNumber((num) => num + 1); // 1 + 1 = 2
          setNumber((num) => num + 1); // 2 + 1 = 3
          console.log("클릭 종료", number); // 0
          // number = 0 으로 절대 바뀌지 않는다!!
        }}
      >
        +2
      </button>
    </>
  );
}

export default App;

// 컴포넌트가 리렌더링되는 기준은 setter함수가 아니라 컴포넌트 내부 코드가 다 실행되고 난 뒤
// 리렌더링되는 시점은 SEtter()가 호출된 뒤가 아니라, 컴포넌트 내부 코드의 실행이 끝난 뒤!!

// 컴포넌트 내부에 const로 선언된 number값은 컴포넌트가 직접 바꿀 수 없고, 최초에 useState()가 initial value를 내부적으로 저장하고 있다가, setter function이 호출될 때마다 number값을 업데이트해서 컴포넌트 리렌더링시에 반영한다.
