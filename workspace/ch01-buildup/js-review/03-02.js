var item = { no: 1, todo: "두부", done: true };
var item2 = { ...item };

// 1. 대입 연산자로 newItem 생성
var newItem = item;

// 2. Object.assign() 사용해서 속성 추가
// 💫 Object.assign(target, ...source): target 객체에 source객체들의 속성을 추가

// item 객체가 가리키는 메모리 주소 밸류에 다음 delete 속성을 추가한다.
var newItem = Object.assign(item, { delete: true });
// 새로운 메모리를 생성해 새로운 객체를 만든다.
var newItem = Object.assign({}, item, { delete: true });

// 3. item의 속성으로 새로운 객체 생성
var newItem = { no: item.no, done: item.done, todo: item.todo };

// 4. 전개 연산자를 이용한 복사
// var newItem = { ...item, done: false };

// item, newItem 비교
// newItem.done = false;
console.log(item, newItem);
console.log("같은 객체인가?", item === newItem);
