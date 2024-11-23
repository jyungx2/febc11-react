import { useRef, useState } from "react";
import { PropTypes } from "prop-types";

function TodoInput({ addItem }) {
  const [title, setTitle] = useState("");
  // const [nextId, setNextId] = useState(4);

  // 🌸 포커스를 주기 위해 DOM 객체에 직접 접근해야 한다.
  // 역할2) 강의자료 👉 태그에 ref 속성을 추가하면 브라우저 DOM 엘리먼트에 직접 접근 가능 / 포커스, 미디어 재생, 애니메이션 실행 등과 같은 작업은 useRef를 사용해 브라우저 DOM에 직접 접근하여 제어해야 함
  const titleElem = useRef(null);

  const handleAdd = () => {
    if (title.trim() !== "") {
      // 🌼
      // const item = { _id: nextId, title, done: false };
      addItem(title); // addItem()이 객체가 아닌, title만 관리하도록!

      // setNextId(nextId + 1);
      setTitle("");

      // 🌸 useRef()로 만든 돔 객체(=current)를 인풋요소의 ref속성으로 연결시켜 인풋요소 자체를 돔객체로 만들고, 그 상에서 focus 메소드 실행
      titleElem.current.focus();
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") handleAdd();
  };

  return (
    <div className="todoinput">
      <input
        type="text"
        autoFocus
        onKeyUp={handleKeyUp}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        ref={titleElem}
      />
      <button type="button" onClick={handleAdd}>
        추가
      </button>
    </div>
  );
}

TodoInput.propTypes = {
  addItem: PropTypes.func.isRequired,
};

export default TodoInput;
