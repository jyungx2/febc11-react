import Todo from "@pages/Todo";
import { produce } from "immer";
import { useState } from "react";

// ✅ Container 컴포넌트: 화면 상의 상태 관리와 비즈니스 로직만 담당하는 코드
// ✅ 표현 컴포넌트: 부모로부터 전달받은 Props를 기반으로 화면의 UI만 렌더링하는 기능에만 집중하는 코드 => 현재 상태의 Header, Footer

function TodoContainer() {
  // 샘플 목록
  const sampleItemList = [
    { _id: 1, title: "두부", done: true },
    { _id: 2, title: "계란", done: false },
    { _id: 3, title: "라면", done: true },
  ];

  const [itemList, setItemList] = useState(sampleItemList);

  // 할일 추가
  const addItem = (item) => {
    const newItemList = [...itemList, item]; // 객체일 경우 새로운 객체로 만들어야 화면 갱신이 됨
    setItemList(newItemList); // setter를 이용해야 화면 갱신이 됨
  };

  // 할일 완료/미완료 처리
  const toggleDone = (_id) => {
    // 🔴 데이터 갱신(상태 변경)
    /*
    // const newItemList = [...itemList];
    const item = itemList.find((item) => item._id === _id);
    // item.done = !item.done; // ✨
    setItemList([...itemList]); // 💥새로운 메모리주소 가지는 새로운 배열(객체) 생성하여 리렌더링 유도 - 💥but, 상태의 불변성을 유지하지 못함 .. 여기서 상태의 불변성이라는 건, 배열 요소 하나하나는 ...에 의해서 새로운 메모리주소로 복사가 됐지만, 요소 안에 있는 done이라는 속성은 깊은복사로 새롭게 복사해주지 않았기 때문에, 원본 데이터와 동기화가 되어 불변성이 유지되지 못한다는 것!!
    console.log("예전 done 값", item.done); // 👉 이걸로 불변성 유지못하는 증거 보여주심 -> itemList의 각각의 요소에 해당하는 "객체 안에 있는 속성"또한 바뀌면 안 된다!! 모든 요소는 불변성이 유지되어야 한다.. -> 원본 데이터는 그대로 유지하고, 깊은복사를 통해 새로운 리스트를 만들어줘야 한다..
    */

    // const newItem = { ...item, done: !item.done }; // ✨이 부분을 이런식으로 깊은복사를 해줘야하는데, 손이 많이 가므로 immer 라이브러리를 쓰자!
    // ✅ immer 임포트한 후, 마치 원래 깊은복사/얕은복사의 필요성을 모르고 코딩한 것처럼 쓸 수 있다.. <-> 💥addItem 함수는 객체 안의 속성을 또 건드릴 필요가 없고, 객체 자체만 추가하는 함수이기 때문에 그냥 spread operator만 이용해서 해도 된다!!
    const newItemList = produce(itemList, (draft) => {
      const item = draft.find((item) => item._id === _id);
      item.done = !item.done;
    });

    console.log("예전 itemList", itemList);
    console.log("새로운 itemList", newItemList);
  };

  // 할일 삭제
  const deleteItem = (_id) => {
    const newItemList = itemList.filter((item) => item._id !== _id); // 필터는 무조건 새로운 배열 리턴
    setItemList(newItemList);
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
