// 1. 지정한 수가 소수인지 여부를 반환
// var isPrime = memo(function (num) {
//   console.time("소요 시간");
//   console.log("소수 판별 시작.", num);

//   // TODO: 소수 판별 코드
//   let prime = num > 1; // 1은 소수가 아니기 때문에 거름.

//   for (let i = 2; i < num; i++) {
//     if (num % i === 0) {
//       prime = false;
//       break;
//     }
//   }

//   console.log("소수 판별 결과.", prime);
//   console.timeEnd("소요 시간");
//   return prime;
// });

// 3. 2번처럼 memo 함수로 감싸주어 Memoization기능 이용 (바로 감싸준 것만 차이점)
var isPrime = memo(function (num) {
  console.time("소요 시간");
  console.log("소수 판별 시작.", num);

  // TODO: 소수 판별 코드
  let prime = num > 1; // 1은 소수가 아니기 때문에 거름.

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      prime = false;
      break;
    }
  }

  console.log("소수 판별 결과.", prime);
  console.timeEnd("소요 시간");
  return prime;
});

/*
// ** 메모이제이션(JS 함수 언어): 자기한테 주어진 인풋만 사용하는 순수함수의 경우에만 사용가능한 기능

// 지정한 수가 소수인지 여부를 반환
var isPrime = function (num) {
  // 캐시를 위한 코드
  // 최초의 한번만 빈 객체로 초기화 (||: Falsy일 때 디폴트값으로 사용)
  isPrime._cache = isPrime._cache || {}; // cache라는 객체 생성

  // 캐시 여부 체크
  if (isPrime._cache[num] !== undefined) {
    // 요소가 이미 캐시 되어 있을 때, true or false를 리턴 (cache hit)
    return isPrime._cache[num];
  } else {
    // 소수 판별 코드
    return (isPrime._cache[num] = isPrime2(num)); // Key(number): value(true/false)
  }
};
*/

// 2. 지정한 함수에 Memoization 기능을 추가 (memoization 기능의 함수로 감싸준다.)
function memo(fn) {
  return function (args) {
    // 캐시를 위한 코드
    // 최초의 한번만 빈 객체로 초기화 (||: Falsy일 때 디폴트값으로 사용)
    fn._cache = fn._cache || {}; // cache라는 객체 생성

    // 캐시 여부 체크
    if (fn._cache[args] !== undefined) {
      // 요소가 이미 캐시 되어 있을 때, true or false를 리턴 (cache hit)
      return fn._cache[args];
    } else {
      // 소수 판별 코드
      return (fn._cache[args] = fn(args)); // Key(number): value(true/false)
    }
  };
}

// var isPrime = memo(isPrime); // memoization 기능 추가

isPrime(1);
isPrime(2);
isPrime(3);
isPrime(4);
isPrime(5);
isPrime(6);
isPrime(7);
isPrime(8);
isPrime(9);
isPrime(1000000007); // 십억칠
isPrime(1000000007);
isPrime(1000000007);
