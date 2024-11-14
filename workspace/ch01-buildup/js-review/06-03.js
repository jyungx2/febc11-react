// 06-02.js 복사
function f1(callback) {
  console.log(`2. f1 작업 시작.`);
  console.log(`3. f1 작업중...`);
  setTimeout(() => {
    // .....
    console.log(`4. f1 작업 종료.`);
    callback("f1의 결과물"); // return `f1의 결과물`
  }, Math.random() * 2000);
}

function f2(f1Result, callback) {
  console.log(`5. ${f1Result}로 f2 작업 시작.`);
  console.log(`6. f2 작업중...`);

  setTimeout(() => {
    // .....
    console.log(`7. f2 작업 종료.`);
    callback("최종 결과물");
  }, Math.random() * 2000);
}

function test() {
  // const f1Result = f1(() => {});
  // const result = f2(f1Result);
  f1((f1Result) => {
    f2(f1Result, (result) => console.log("8", result));
  });
}

console.log("1. 테스트 시작.");
// test() 시켜놓고 퇴근! 걔는 걔대로 일하고 나는 나대로 일하고 가면 됨.
// callback 함수의 문제점은 가독성이 현저히 떨어진다 => Promise 탄생 => async/await으로 발전
test();
console.log("9. 테스트 완료.");
