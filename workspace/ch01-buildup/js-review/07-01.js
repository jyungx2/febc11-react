// Array.prototype.forEach(callback) : 배열의 각 요소에 대해 콜백 함수를 실행
// callback(elem, index)

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = 0;

// 홀수의 합
array.forEach(function (el) {
  if (el % 2 !== 0) {
    result += el;
  }
});

// 짝수의 합
array.forEach((el) => {
  if (el % 2 === 0) {
    result += el;
  }
});

console.log(result);
