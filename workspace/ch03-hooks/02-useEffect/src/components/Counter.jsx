import { useState, useEffect } from "react";
import Button from "./Button";
import PropTypes from "prop-types";

Counter.propTypes = {
  children: PropTypes.string,
};

// children = "0" : undefined..
function Counter({ children = "0" }) {
  const initCount = Number(children);
  const [count, setCount] = useState(initCount);
  const [step, setStep] = useState(1);

  const handleDown = () => {
    setCount(count - step);
  };
  const handleUp = () => {
    setCount(count + step);
  };
  const handleReset = (event) => {
    setCount(initCount);
  };

  // ❌ 1초 후에 자동으로 값 한번 증가하고 싶었는데,
  // 무한 렌더링 발생 - handleUp()함수의 setCount때문에 상태가 업데이트될 때마다 리렌더링..
  // 🤖 setCount가 호출되면 상태가 변경되고, 상태 변경은 컴포넌트 리렌더링을 트리거합니다.
  // 리렌더링이 발생하면 함수 컴포넌트의 내용(모든 코드)이 다시 실행됩니다.
  // setTimeout(() => {
  //   handleUp();
  // }, 1000);

  // ✅ 마운트 된 후에 최초 한번만 값 증가
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log(
  //     "dependencies에 빈 배열을 지정하면 컴포넌트가 마운트된 후에 한번만 호출됨 (업데이트 후에는 호출되지 않음)"
  //   );
  // }, []);

  // ✅ 마운트 & 업데이트 후에 값 증가 = 안 쓴 것과 마찬가지로 무한루프에 빠짐
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log(
  //     "dependencies를 지정하지 않으면 컴포넌트가 마운트된 후와 업데이트 된 후에 모두 호출됨"
  //   );
  // });

  // ✅ 업데이트 시 지정값이 변경되었을 때 증가
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log(
  //     "dependencies에 값을 지정하면 컴포넌트가 업데이트될때 지정한 값 중 하나라도 수정되었을 경우 호출됨"
  //   );
  // }, [step]);

  // 💥 step을 너가 useEffect함수 내에서 쓰질 않는데, 진짜 이 상태를 기준으로 호출하고 싶은거 맞니?
  // handleUp도 같이 써줘야하는거 아니야?.. => 이렇게 하면 안된다. HandleUp이 바뀌면 호출하라는 말인데, 이 함수는 리렌더링 될 때마다 새롭게 만들어지는, 새로운 주소를 가지는 함수로 리렌더링되기 떄문에 step을 바꿔주지 않아도 호출될 것이기 때문!!
  // -> 무시해도 되는 경고! 내가 하고싶다는데!

  // ✨ Closure: 함수 안에 함수가 있고, 내부에 위치한 함수에서 바깥에 있는 지역변수를 이용하고 있을 때..
  // 이때 내부함수가 참조할 지역변수는 이 함수가 생성될 시점에 변수값만을 참조하므로 아무리 증감치를 내가 바꿔줘도 최초 이니셜값인 1로만 나오게 된다.

  // useEffect(() => {
  //   console.log("setup 함수 호출");
  //   const timer = setInterval(() => {
  //     console.log(step, new Date());
  //   }, 1000);
  //   return () => {
  //     console.log("cleanup 함수 호출");
  //     clearInterval(timer); //
  //   };
  // }, [step]);

  useEffect(() => {
    console.log("setup 함수 호출");
    const timer = setInterval(() => {
      console.log(step, new Date());
    }, 1000);
    // 🖍️ [step]을 dependencies로 지정해주어 이 값이 수정됐을 때마다 새롭게 호출한다..
    // 💥 이렇게 해도 문제가 생기는 게, 이전에 step였던 것도 모조리 다 출력되므로 리턴값으로 cleanup함수를 만들고, 그 안에서 cleanInterval을 이용해 setInterval() 함수를 지우도록 하자.
    return () => {
      console.log("cleanup 함수 호출");
      clearInterval(timer); //
    };
  }, [step]);

  return (
    <div id="counter">
      <label htmlFor="step">증감치</label>
      {/* value가 없으면, 리액트에서 제어하지 않는 비제어 컴포넌트가 돼서
      해당 인풋요소에 입력된 값(상태)을 관리하고자 한다면, DOM을 추가로 가져와서 다뤄야 하기 때문에,
      value를 리액트에서 직접 제어할 수 있도록 하드코딩해주는 게 아닌, count(useState 상태)를 써준다.
      */}

      {/* 그런데, 이렇게 제어 컴포넌트로 만들어주면, 'onChange' 속성 또한 추가해주어야 하며, 만약 굳이 추가하지 않을 거라면 차라리 'defaultValue' 속성으로 밸류값을 설정해주어야 한다. */}
      <input
        type="number"
        style={{ width: "40px" }}
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <Button color="red" onClick={handleDown}>
        -
      </Button>
      <Button onClick={handleReset}>{initCount}</Button>
      <Button color="blue" onClick={handleUp}>
        +
      </Button>
      <span>{count}</span>
    </div>
  );
}

export default Counter;
