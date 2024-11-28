// import counterReducer from "@redux/counterReducer";
import counterSlice from "@redux-toolkit/counterSlice";
import { configureStore } from "@reduxjs/toolkit";
// import { legacy_createStore as createStore } from "redux";

// createStore대신 툴킷의 configureStore 사용
const store = configureStore({
  reducer: {
    counterStore: counterSlice.reducer,
  },
});
// store는 리덕스가 관리하므로 리덕스가 제공해주는 createStore라는 훅을 이용

export default store;
