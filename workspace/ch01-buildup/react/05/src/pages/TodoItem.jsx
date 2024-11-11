function TodoItem({ item, toggleDone, deleteItem }) {
  return (
    <li>
      <span>{item._id}</span>
      {/* 🚫🚫🚫🚫🚫🚫🚫 () => 빼먹으면 undefined로 쓴 것과 같다!! ... 이벤트 발생시, 함수를 바로 실행하는 게 아닌, 그냥 선언만 해줘야 하기 때문에!! ()을 붙이면, 함수가 선언되는게 아니라, 함수를 호출하는 것이라서 리턴값이 등록되는 것이고, 이때 리턴값은 Undefined라서... 결론: 이벤트 콜백함수 등록할 땐, 호출하지 말고 등록하는 것에 유의해라!! */}
      <span onClick={() => toggleDone(item._id)}>
        {item.done ? <s>{item.title}</s> : item.title}
      </span>
      <button type="button" onClick={() => deleteItem(item._id)}>
        삭제
      </button>
    </li>
  );
}

export default TodoItem;
