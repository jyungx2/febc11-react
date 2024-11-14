function func(data1, data2) {
  data1 += 10;
  data2[0] += 10;
  console.log(data1, data2[0]);
}

var d1 = 80; // number (primitive type)
var d2 = [80]; // array(object) (reference type)

console.log(typeof d1, typeof d2);

console.log("===== 함수 호출 이전 =====");
console.log(d1, d2[0]); // 80 80

console.log("===== 함수 호출 =====");
func(d1, d2); // 90 90

console.log("===== 함수 호출 이후 =====");
console.log(d1, d2[0]); // 80(primitive) 90 (reference)
// ... d1 =="값"을 copy==> data1, d2 =="주소"를 copy==> data2 라는 매개변수로 각각 복사하여 가져온 다음에, 함수의 로직에 따라 값을 수정한 후, 다시 출력한 것
// 즉, d1의 매개변수에 해당하는 data1은 d1의 원시적인 타입의 값을 복사해오고, 함수 로직에 따라 값이 90으로 바꼈지만, d1 자체는 함수를 실행하기 전의 값(80)을 유지한다.
// d2의 매개변수에 해당하는 data2는 d2의 참조형 타입의 데이터를 복사해오고, 이때, 직접적으로 값을 복사해오는 게 아닌, 데이터가 저장된 메모리의 주소를 복사해오기 때문에 함수 로직에 따라 값이 바뀌면, d2 또한 같은 메모리 주소를 참조하기 때문에 data2를 매개변수로 넣어줬음에도 불구하고 d2 또한 data2와 같은 값을 갖게 된다.
