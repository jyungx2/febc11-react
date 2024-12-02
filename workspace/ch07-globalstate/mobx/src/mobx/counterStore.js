import { makeAutoObservable } from "mobx";

class CounterStore {
  count = 5;

  constructor() {
    makeAutoObservable(this); // 상태 관찰 함수를 프로토타입에 등록
  }

  countUp(step) {
    this.count += step;
    console.log(this.count);
  }

  countDown(step) {
    this.count -= step;
  }

  reset() {
    this.count = 0;
  }
}
export default new CounterStore();
// 모든 기능을 클래스 안에 담아 상태관리! 클래스기반으로 상태를 정의/관리.
// jotai처럼 Provider 컴포넌트 사용 안 해도 OK.
