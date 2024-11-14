// Array.prototype.find(callback) : 배열의 각 요소에 대해 콜백 함수를 실행
// callback(elem, index)
// true를 반환하는 ✨첫번째✨ 콜백함수에 전달된 요소를 반환
// true를 반환하는 콜백함수가 없을 경우, ✨Undefined✨를 반환

// 배열 요소 중 2와 3의 최소공배수 구하기
var array = [6, 7, 8, 1, 4, 5, 2, 3, 9, 10];
// '-'을 반환할 경우, a, b 정렬 (순서 그대로)
// '+'를 반환할 경우, b, a 정렬 (순서 바꿈)
// '='을 반환할 경우, 그대로
array.sort((a, b) => a - b); // 오름차순.. getting bigger over time
console.log(array);

var result = array.find((num) => num % 2 === 0 && num % 3 === 0);

console.log(result);
