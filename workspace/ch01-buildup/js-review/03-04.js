var itemList = [
  { no: 1, todo: "두부", done: false },
  { no: 2, todo: "계란", done: false },
  { no: 3, todo: "라면", done: false },
];

// 1. 대입 연산자
var newItemList = itemList; // true (같은 메모리주소 복사)

// 2. 전개 연산자를 이용한 복사(얕은 복사)
var newItemList = [...itemList]; // false (새로운 배열 생성 -> 다른 메모리주소 가짐 but 안의 요소(객체)들은 그대로 itemList와 동일한 메모리주소값 가지므로...✅)

// itemList, newItemList 비교
// newItemList[1].done = true; // ✅ 여기서 객체의 속성(done)값을 바꿨을 때, NewItemList 뿐만 아니라 itemList의 객체 또한 done = true로 바뀜.

// 👉 기존 상태(array/obejct)는 건들지 말고, 새로운 복사본만 만들어 수정해야 한다. => ... (spread operator) 이용해 다른 메모리주소를 참조하는 객체를 만들어 써야 한다. (불변성 유지!!)

// 3. 객체를 속성으로 가질 경우, 깊은 복사를 위해서는 속성도 새로운 객체로 복사해야 함(불변성을 지키기 위해)
newItemList[1] = { ...itemList[1] };
newItemList[1].done = true; // 위의 깊은 복사를 거친 후에는 itemList의 객체 done속성이 false로 그대로 유지됨.. => 불변성 keep!!

console.log(itemList, newItemList);
console.log(itemList === newItemList); //
console.log(itemList[1] === newItemList[1]);
