import { useEffect, useState } from "react";
import Left1 from "@components/Left1";
import Right1 from "@components/Right1";
import { CounterProvider } from "@context/CounterContext";
import { SimpleContext } from "@context/SimpleContext";

function App() {
  // // 최종적으로 Left3에 전달
  // const [count, setCount] = useState(10);

  // // Right3에 전달
  // const countUp = function (step) {
  //   setCount(count + step);
  // };
  // const countDown = function (step) {
  //   setCount(count - step);
  // };
  // const reset = function () {
  //   setCount(0);
  // };

  // 마운트 뿐아니라, 업데이트 될 때도 렌더링
  useEffect(() => {
    console.log("# App 렌더링.");
  });

  return (
    <>
      <h1>Context API - Prop Drilling</h1>
      <div id="container">
        <h1>App</h1>
        <div id="grid">
          {/* Provider 컴포넌트로 감싸주어 Provider로부터 공급되는 데이터(상태,상태관리함수)들을 prop으로 직접 보내지 않고도 사용할 수 있도록 해주자 */}
          <CounterProvider>
            <Left1 />
            {/* 💥 Simple 컨텍스트는 Right1만 감싸기 때문에 해당 hello라는 밸류는 <Right1 />와 그 하위 컴포넌트들만 쓸 수 있음!! */}
            <SimpleContext.Provider value={{ hello: "world" }}>
              <Right1 />
            </SimpleContext.Provider>
          </CounterProvider>
        </div>
      </div>
    </>
  );
}

export default App;
