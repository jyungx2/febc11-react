import Yong from "../yong.js";

function Counter() {
  // 컴포넌트는 기능(함수)까지 같이 가지고 있어야 된다.
  // 컴포넌트에서 UI, UI에서 발생하는 이벤트까지 함께 처리하면 개발생산성과 유지보수성이 높아진다. => "컴포넌트화"
  // 정말 재사용을 하고 싶다면, script안에 묶어놓지 말고, 각각의 컴포넌트를 별개의 js파일로 저장해 임포트해서 써야한다.
  // ✨
  const [count, setCount] = Yong.useState(10);
  // setCount: 값(10)을 수정할 때 사용할 함수를 넘겨줄 예정.

  const handleDown = () => {
    // TODO: 데이터 갱신 👉 화면갱신을 따로 해주지 않아도, yong 라이브러리를 임포트해서 얘보고 심부름시킬 것이기 때문에, 데이터(상태값)만 잘 제어하면 화면은 알아서 자동으로 갱신되도록 만들 것임!!!

    // ✨ useState()를 이용해 값을 바꿀 경우, const로 선언돼있기 때문에
    // 직접적으로 count--/++으로 값을 바꿀 경우 에러가 발생한다!!
    // 에러 찾기 쉬움.. -> 아, 맞다! 값 변경을 직접적으로 하지 말고, 친절한 setCount라는 메소드를 사용해야겠구나! 라는 생각이 든다 ㅎㅎ
    setCount(count - 1);

    // // TODO: 화면 갱신
    // const counterSpan = document.querySelector('#counter > span');
    // counterSpan.textContent = count;
  };

  const handleUp = () => {
    // count++;
    setCount(count + 1);

    // const counterSpan = document.querySelector('#counter > span');
    // counterSpan.textContent = count;
  };

  const handleReset = (event) => {
    // count = 0;
    setCount(0);
    // const counterSpan = document.querySelector('#counter > span');
    // counterSpan.textContent = count;
  };

  return Yong.createElement(
    "div",
    { id: "counter" },
    Yong.createElement("button", { type: "button", onclick: handleDown }, "-"),
    Yong.createElement(
      "button",
      { type: "button", onclick: (event) => handleReset(event) },
      0
    ),
    Yong.createElement("button", { type: "button", onclick: handleUp }, "+"),
    Yong.createElement("span", null, count)
  );
}

export default Counter;
