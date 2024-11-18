import { useRef, useState } from "react";

const errorStyle = {
  fontSize: "12px",
  color: "red",
  fontWeight: "bold",
};

const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const cellphoneExp = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;

function App() {
  // 유저의 상태 관리하는 State 시스템
  const [user, setUser] = useState({
    name: "",
    email: "",
    cellphone: "010",
  });

  const [errors, setErrors] = useState({});

  // 🟢 DOM 객체에 직접 접근하려 할 때..
  // name 인풋 요소를 가상 돔으로 가져오기 위해 사용되는 useRef
  const nameElem = useRef(null);
  const emailElem = useRef(null);
  const cellphoneElem = useRef(null);

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [cellphone, setCellphone] = useState("010");

  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handleCellphoneChange = (event) => {
  //   setCellphone(event.target.value);
  // };

  // 하나의 이벤트 핸들러로 처리!
  const handleChange = (event) => {
    const newUser = { ...user, [event.target.name]: event.target.value };
    setUser(newUser);
  };

  // 🔸 form 태그의 action이라는 Url로 요청을 보내는 automatic behavior⬆️
  // 나중에는 브라우저 기본동작인 form요소의 submit 이벤트 호출을 이용하는 게 아닌, ajax 비동기통신 사용할 예정..
  const handleSubmit = (event) => {
    // 브라우저의 기본 동작 취소 (submit 동작 취소)
    event.preventDefault(); // 내가 알아서 ajax 통해서 서버에 요청 보낼테니까 브라우저 너는 그냥 가만히 있어!

    // 입력 메시지 검증 작업
    let newErrors;
    if (user.name.trim() === "") {
      newErrors = { name: { message: "이름을 입력하세요." } };
      nameElem.current.focus();
    } else if (user.name.trim().length < 2) {
      newErrors = { name: { message: "이름을 2글자 이상 입력하세요." } };
      nameElem.current.focus();
    } else if (user.email.trim() === "") {
      newErrors = { email: { message: "이메일을 입력하세요." } };
      emailElem.current.focus();
    } else if (user.cellphone.trim() === "") {
      newErrors = { cellphone: { message: "휴대폰 번호를 입력하세요." } };
      cellphoneElem.current.focus();
    } else if (!emailExp.test(user.email)) {
      newErrors = {
        email: {
          message: "이메일 양식에 맞지 않습니다.",
        },
      };
      emailElem.current.focus();
    } else if (!cellphoneExp.test(user.cellphone)) {
      newErrors = {
        cellphone: {
          message: "휴대폰 번호 양식에 맞지 않습니다.",
        },
      };
      cellphoneElem.current.focus();
    }

    if (newErrors) {
      // 검증 실패
      setErrors(newErrors);
    } else {
      // 검증 통과
      setErrors({});
      console.log("서버에 전송", user);
    }
  };

  return (
    <>
      <h1>05 회원가입 입력값 상태 관리</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
          ref={nameElem} // 🟢
        />
        <br />
        <div style={{ errorStyle }}>{errors.name?.message}</div>

        <label htmlFor="email">이메일</label>
        <input
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          ref={emailElem} // 🟢
        />
        <br />
        <div style={{ errorStyle }}>{errors.email?.message}</div>

        <label htmlFor="cellphone">휴대폰</label>
        <input
          id="cellphone"
          name="cellphone"
          value={user.cellphone}
          onChange={handleChange}
          ref={cellphoneElem} // 🟢
        />
        <br />
        <div style={{ errorStyle }}>{errors.cellphone?.message}</div>

        <button type="submit">가입</button>
      </form>

      <p>
        이름: {user.name}
        <br />
        이메일: {user.email}
        <br />
        휴대폰: {user.cellphone}
        <br />
      </p>
    </>
  );
}

export default App;
