import React from "react";

// addItem의 밑줄: eslint 룰 때문.(react의 prop-types라는 린트 규칙에 어긋나서 빨간 밑줄 생긴 것..)
// eslint.config.js - rules에  "react/prop-types": "warn" 로 경고로 바꿔달라고 추가..또는 off로 하면 아예 꺼짐
function TodoInput({ addItem }) {
  const [title, setTitle] = React.useState("");
  const [nextId, setNextId] = React.useState(4);

  const handleAdd = () => {
    if (title.trim() !== "") {
      const item = { _id: nextId, title, done: false };
      addItem(item);

      setNextId(nextId + 1);
      setTitle("");
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
      />
      <button type="button" onClick={handleAdd}>
        추가
      </button>
    </div>
  );
}

export default TodoInput;
