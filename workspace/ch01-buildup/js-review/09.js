function sayHello(strings, ...values) {
  console.log(strings);
  console.log(values);

  let sentence = `${strings[0]}`;

  for (let i = 1; i < strings.length; i++) {
    sentence += `<strong>${values[i - 1]}</strong>${strings[i]}`;
  }
  console.log(sentence);
}

sayHello(
  ["안녕하세요. ", "님. 오늘 날씨는 ", " 입니다. 즐거운 ", " 보내세요."],
  "무지",
  "맑음",
  "하루"
);
// sayHello(평문 문자 배열, 강조 문자 배열)
// => 안녕하세요. <strong>무지</strong>님. 오늘 날씨는 <strong>맑음</strong>입니다.
