import Todo from "@pages/Todo";
import TodoReducer from "@pages/TodoReducer";
// import { produce } from "immer"; // 필요없음👋
import { useReducer, useRef, useState } from "react"; // useState👋

function TodoContainer() {
  // 샘플 목록
  const sampleItemList = [
    { _id: 1, title: "두부", done: true },
    { _id: 2, title: "계란", done: false },
    { _id: 3, title: "라면", done: true },
  ];

  // 🧩 useState -> useReducer
  const [itemList, itemListDispatch] = useReducer(TodoReducer, sampleItemList);

  // 🌼 fetched this from TodoInput component..
  // TodoInput보고 아이디 상태까지 관리하라는 거는 투머치!!
  // 아이디가 필요한 데이터(=sampleItemList)는 TodoContainer가 가지고 있으면서, id는 TodoInput보고 관리하라는게 말이 되냐!?
  // => 타이틀만 addItem한테 보내고, id는 여기서 관리하고 type이 'ADD'일 때, nexId 상태값으로 지정하자. (done은 어차피 false이니까 상관없다.)

  // 🌸 useRef 수정
  // 역할1) 강의자료 👉 useState는 값이 변경되면 컴포넌트가 다시 렌더링되지만 useRef는 값이 변경되어도 컴포넌트가 다시 렌더링되지 않음
  // const [nextId, setNextId] = useState(sampleItemList.length + 1);
  const nextId = useRef(sampleItemList.length + 1);

  // 할일 추가
  const addItem = (title) => {
    itemListDispatch({
      type: "ADD",
      // 🌼 addItem()은 객체 자체(item)가 아닌, title만 관리하도록 하기 위해
      // TodoInput 컴포넌트로부터 id = nexId 상태값을 가져와, id를 nextId라는 상태값으로 지정!
      value: { _id: nextId.current, title, done: false },
    });
    // setNextId(nextId + 1);
    nextId.current += 1;
  };

  // 할일 완료/미완료 처리
  const toggleDone = (_id) => {
    // 🔴 데이터 갱신(상태 변경)
    // const newItemList = produce(itemList, (draft) => {
    //   const item = draft.find((item) => item._id === _id);
    //   item.done = !item.done;
    // });

    itemListDispatch({ type: "TOGGLE", value: { _id } });
  };

  // 할일 삭제
  const deleteItem = (_id) => {
    // const newItemList = itemList.filter((item) => item._id !== _id); // 필터는 무조건 새로운 배열 리턴
    // setItemList(newItemList);

    itemListDispatch({ type: "DELETE", value: { _id } });
  };

  return (
    <Todo
      itemList={itemList}
      addItem={addItem}
      toggleDone={toggleDone}
      deleteItem={deleteItem}
    />
  );
}

export default TodoContainer;
