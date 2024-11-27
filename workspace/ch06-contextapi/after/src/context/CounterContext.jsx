import PropTypes from "prop-types";
import { createContext, useState } from "react";

// 1. Context 객체를 생성
const CounterContext = createContext();

CounterProvider.propTypes = {
  children: PropTypes.node,
};

// 3. Provider 컴포넌트를 작성해서 export
export function CounterProvider({ children }) {
  // 4. 데이터, 상태, 상태를 관리하는 함수를 정의
  // 최종적으로 Left3에 전달
  const [count, setCount] = useState(10);

  // Right3에 전달
  const countUp = function (step) {
    setCount(count + step);
  };
  const countDown = function (step) {
    setCount(count - step);
  };
  const reset = function () {
    setCount(0);
  };

  // 5. Context 객체의 Provider로 자식 컴포넌트를 감싸서 반환
  // value 속성에 전달할 context값 지정
  const values = {
    state: { count },
    actions: { countUp, countDown, reset },
    hello: "counter",
  };

  // 🖍️ 컨텍스트 객체의 Provider라는 속성을 쓴 이유가, 드릴링으로 단계적으로 보내야 될 prop시스템 대신에 최상위에서 value속성의 상태/상태관리함수 등등의 데이터를 한번에 공급하는 시스템으로 바꿀 거라서 함수의 이름 자체를 Provider(공급자)로 한거고, 이때, 컨텍스트의 Provider속성을 이용해야 한다. Provider 컴포넌트의 value속성으로 공유되어야 할 데이터를 Provider 컴포넌트로 감싸진 컴포넌트(children)에게 전달할 수 있다.
  return (
    <CounterContext.Provider value={values}>{children}</CounterContext.Provider>
  );
}

//  <CounterProvider>
//    <App />
//  </CounterProvider>;

//   <CounterContext.Provider value={values}>{children}</CounterContext.Provider>;
// => 여러 컴포넌트가 상태값을 공유해야 할 때, 단계적인 Prop 시스템보다, 컨텍스트를 이용해 전역적으로 상태를 관리하도록

// 2. Context 객체 export
export default CounterContext;
