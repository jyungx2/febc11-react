// Array.prototype.reduce(callback, initialvalue) : 배열의 각 요소에 대해 콜백 함수를 실행
// callback(acc-누적값, cur-현재값, i-인덱스, arr-원본 배열)
// initialValue가 주어지면 누적값의 초기값으로 사용하고,
// initialValue가 주어지지 않으면 배열의 첫번째 요소가 누적값의 초기값으로 사용되고, 두번째 요소부터 콜백 함수가 호출된다..

// 배열 요소 중 홀수의 합계 구하기
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = array.reduce((sum, num) => {
  if (num % 2 !== 0) {
    return sum + num; // 홀수일 때 sum에 num을 누적해서 반환
  } else {
    return sum; // 짝수일 때 이전 sum을 그대로 반환
  }
}, 0);

var result = array.reduce((sum, num) => {
  return num % 2 ? sum + num : sum;
});

var result = array.reduce((sum, num) => (num % 2 ? sum + num : sum), 0);

// num % 2 = 0 ; falsy >> 0 채택(&&: 오히려 좋아) >> sum = sum + 0 (짝수 더하지 않고 반환)
// num % 2 = (number) ; true >> num 채택 >> sum = sum + num (홀수는 더해서 반환)
var result = array.reduce((sum, num) => (sum += num % 2 && num), 0);
console.log(result); // 25
