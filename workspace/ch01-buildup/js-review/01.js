var arr = [10, 20, 30];

// 각 요소의 제곱값으로 구성된 새로운 배열 생성
// var arr2 = [100, 400, 900];

// for
const arr2 = [];
for (let i = 0; i < arr.length; i++) {
  arr2.push(arr[i] * arr[i]);
}
console.log(arr2);

// for of(ES6)
const arr3 = [];
for (let item of arr) {
  arr3.push(item * item);
}
console.log(arr3);

// Array.prototype.forEach(), ES5
const arr4 = [];
arr.forEach(function (item, i) {
  arr4.push(item * item);
  console.log(i);
});
console.log(arr4);

// Array.prototype.map(), ES6
const newArr1 = arr.map(function (item) {
  return item * item;
});

// Arrow function, ES6
const arr5 = [];
arr.forEach((item) => arr5.push(item * item));
console.log(arr5);

const newArr2 = arr.map((item) => item * item);
// 새로운 배열 생성!
console.log(newArr1, newArr2);
