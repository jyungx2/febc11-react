import { createSlice } from "@reduxjs/toolkit";

// ActionCreator + Reducer = Slice 함수
// 리듀서와 액션 생성자를 간단하게 한 큐에 작성!
// 👉 반환값 {reducer, actions, ...}
// > reducer: 리듀서 함수 - Redux 스토어에 전달해야 함.
const counterSlice = createSlice({
  name: "myCounter", // 슬라이스 이름(액션 타입의 접두사로 사용됨)
  initialState: { count: 10 }, // 초기 상태
  reducers: {
    // 📍 immer 라이브러리를 '내부적으로' 사용 - state를 직접 수정해도 됨. (** 기존 Reducer함수에서는 원본을 건드리지 않기 위해 새로운 객체를 만들어서 리턴해야 했음 **)
    countUp: (state, action) => {
      state.count += action.payload;
    },
    countDown: (state, action) => {
      state.count -= action.payload;
    },
    countReset: (state) => {
      state.count = 0;
    },
  },
});

// ActionCreater 파일을 따로 만들어서 정의해줘야 했지만, 슬라이스가 대신 알아서 만들어줌!
// > actions: 각 리듀서에 해당하는 액션 생성자 객체
// countUp(2) => {type: 'myCounter_countUp' , payload: 2}
export const { countUp, countDown, countReset } = counterSlice.actions;

export default counterSlice;
