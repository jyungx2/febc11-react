// Array.prototype.map(callback) : 배열의 각 요소에 대해 콜백 함수를 실행
// callback(elem, index)
// 호출되는 콜백함수가 반환하는 값을 요소로 하는 ✨새로운 배열✨을 반환

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = 0;

// 홀수의 합
const evenNum = array.map((el) => el % 2 === 0);
const newArr = array.map((number) => {
  if (number % 2 !== 0) {
    return number;
  } else {
    return 0;
  }
});

const newArray = array.map((num) => (num % 2 ? num : 0));

newArr.forEach((number) => (result += number));

console.log(result);
