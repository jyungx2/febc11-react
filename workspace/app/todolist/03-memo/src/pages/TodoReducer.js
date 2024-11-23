import { produce } from "immer";
//

// state, action을 전달받고 새로운 state를 반환하는 순수 함수
// 리스트 추가/토글/삭제 기능 => '총 3가지 기능(type)'
function TodoReducer(state, action) {
  // - state: [{}, {}, {}],
  // - action: { type: 'ADD', value: {_id: 1, title: '두부', done: true}}
  const targetIndex = state.findIndex((item) => item._id === action.value._id);

  let newState;

  switch (action.type) {
    case "ADD":
      newState = produce(state, (draft) => {
        draft.push(action.value);
      });
      break;

    case "TOGGLE":
      // immer 라이브러리를 이용해 변경하고 싶은 값을 직접적으로 수정가능!
      newState = produce(state, (draft) => {
        draft[targetIndex].done = !draft[targetIndex].done;
      });
      break;

    case "DELETE":
      // splice: 원본을 수정하므로 상태관리에선 쓰면 안되는데, immer 라이브러리를 이용하며 깊은복사까지 통째로 수행해주기 때문에 써도 상관없다!
      newState = produce(state, (draft) => {
        draft.splice(targetIndex, 1);
      });
      break;

    default:
      newState = state;
  }
  return newState;
}

export default TodoReducer;
