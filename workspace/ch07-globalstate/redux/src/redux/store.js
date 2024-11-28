import counterReducer from "@redux/counterReducer";
import { legacy_createStore as createStore } from "redux";

const store = createStore(counterReducer);
// store는 리덕스가 관리하므로 리덕스가 제공해주는 createStore라는 훅을 이용

export default store;
