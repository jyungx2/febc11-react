function f1() {
  console.log(`2. f1 작업 시작.`);
  console.log(`3. f1 작업중...`);
  // ......
  console.log(`4. f1 작업 종료.`);
  return `f1의 결과물`;
}

function f2(f1Result) {
  console.log(`5. ${f1Result}로 f2 작업 시작.`);
  console.log(`6. f2 작업중...`);
  // ......
  console.log(`7. f2 작업 종료.`);
  return `8. 최종 결과물`;
}

function test() {
  const f1Result = f1();
  const result = f2(f1Result);
  console.log(result);
}

console.log("1. 테스트 시작.");
test();
console.log("9. 테스트 완료.");
