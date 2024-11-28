export const COUNTER_ACTION = {
  UP: "countUp",
  DOWN: "countDown",
  RESET: "countReset",
};

// 액션을 생성해서 반환 - 속성은 내가 정하기 나름!
// counterActionCreator.countUP(2)
// return {type: 'countUP', payload: {step : 2}}
const counterActionCreator = {
  countUP: (step) => ({ type: COUNTER_ACTION.UP, payload: { step } }),
  countDOWN: (step) => ({ type: COUNTER_ACTION.DOWN, payload: { step } }),
  countReset: () => ({ type: COUNTER_ACTION.RESET }),
};

export default counterActionCreator;
