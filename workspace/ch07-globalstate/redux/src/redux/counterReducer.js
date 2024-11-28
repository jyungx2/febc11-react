import { COUNTER_ACTION } from "@redux/counterActionCreator";

// 초기 상태
const initialState = { count: 0 };

// 현재 상태와 action 객체를 받아서 새로운 상태를 반환하는 순수 함수
// 로직을 컴포넌트 내부에서 직접 구현하지 않고 외부에서 구현
// * state: 이전 상태(useReducer가 내부적으로 관리, 이전의 리턴값이 다음의 state로 전달)
// * action: 동작을 정의한 객체(자유롭게 작성)
// ex) {type: 'countUP', payload: {step : 2}}
// 리턴값: 새로운 상태

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case COUNTER_ACTION.UP:
      // state.count += action.payload.step; // 💥불변성 x💥
      // return state;
      return { ...state, count: state.count + action.payload.step }; // 다른 속성이 있을 수도 있으니까 ...state까지 해주자

    case COUNTER_ACTION.DOWN:
      return { ...state, count: state.count - action.payload.step };

    case COUNTER_ACTION.RESET:
      return { ...state, count: 0 };
  }
  // 💥 상태는 불변성을 가져야 하므로 바뀌면 안된다.
  // 속성값만 바로 접근해서 수정하면 불변성 파괴 ... 같은 주소를 가진 객체를 mutation시키는 것
  // 따라서 immer 라이브러리 사용해서 아예 새로운 객체로 만든 다음에, 수정한 후 리턴 해야 한다.
}

export default counterReducer;
