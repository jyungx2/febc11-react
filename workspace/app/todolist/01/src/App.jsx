import Footer from "@components/Footer";
import Header from "@components/Header";
import Todo from "@pages/Todo";
import { useState } from "react";

function App() {
  // 샘플 목록
  const [itemList, setItemList] = useState([
    { _id: 1, title: "두부", done: true },
    { _id: 2, title: "계란", done: false },
    { _id: 3, title: "라면", done: true },
  ]);

  // 할일 추가
  const addItem = (item) => {
    const newItemList = [...itemList, item]; // 객체일 경우 새로운 객체로 만들어야 화면 갱신이 됨
    setItemList(newItemList); // setter를 이용해야 화면 갱신이 됨
  };

  // 할일 완료/미완료 처리
  const toggleDone = (_id) => {
    // 🔴 데이터 갱신(상태 변경)
    // const newItemList = [...itemList];
    const item = itemList.find((item) => item._id === _id);
    item.done = !item.done;
    setItemList([...itemList]);
  };

  // 할일 삭제
  const deleteItem = (_id) => {
    const newItemList = itemList.filter((item) => item._id !== _id);
    setItemList(newItemList);
  };

  return (
    <div id="todo">
      <Header />
      <Todo
        itemList={itemList}
        addItem={addItem}
        toggleDone={toggleDone}
        deleteItem={deleteItem}
      />
      <Footer />
    </div>
  );
}

export default App;
