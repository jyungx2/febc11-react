import { useMemo, useState } from "react";

var isPrime = function (num) {
  console.time("소요 시간");
  console.log("소수 판별 시작.", num);

  // TODO: 소수 판별 코드
  let prime = num > 1; // 1은 소수가 아니기 때문에 거름.

  for (let i = 2; i < Math.sqrt(num); i++) {
    if (num % i === 0) {
      prime = false;
      break;
    }
  }

  console.log("소수 판별 결과.", prime);
  console.timeEnd("소요 시간");
  return prime;
};

function App() {
  const [name, setName] = useState("GD");
  const [num, setNum] = useState(1);

  // 📢 useMemo(): num값이 바뀌지 않으면 다시 계산하지 않고, 메모이제이션된 값을 이용
  // -> 이름을 바꾸면 name이라는 상태값이 바뀌기 때문에 앱 컴포넌트 자체가 리렌더링 되어야 하는데, 이때 굳이 다시 계산하지 않음
  // * num(상태값)이 바뀌면 다시 계산할 필요o => dependency : [num]
  // const result = isPrime(num);
  const result = useMemo(() => isPrime(num), [num]);

  return (
    <>
      <h1>05 useMemo - 함수의 반환값을 memoize</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        가 좋아하는 숫자:
        <input
          type="number"
          min="1"
          max="1000000007"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
        <div>
          {name}가 좋아하는 숫자 {num}: 소수가
          {result ? (
            <span style={{ color: "blue" }}>맞습니다.</span>
          ) : (
            <span style={{ color: "red" }}>맞습니다.</span>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
