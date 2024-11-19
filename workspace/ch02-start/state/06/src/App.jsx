// import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const errorStyle = {
  fontSize: "12px",
  color: "red",
  fontWeight: "bold",
};

const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const cellphoneExp = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;

function App() {
  // useForm(): 객체를 리턴 - 필요한 속성 4가지 정의해준다.
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit", // 최초 검증 시점, ✨default: onSubmit(Submit/Blur/Focus 중에 결정)
    revalidateMode: "onChange", // 재검증 시점, ✨default: onChange(가장 많이 사용..-> ❓굳이왜필요)
    criteriaMode: "all", // errors 객체에 첫 오류 하나만 포함하거나(firstError) 전부 포함(all), ✨default: firstError
    defaultValues: { name: "", email: "", cellphone: "010" },
  });

  // 🔵 useForm의 매개변수로 토스! -> 더이상 필요 없다.
  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   cellphone: "010",
  // });

  // 🔵 useForm의 매개변수로 토스! -> 더이상 필요 없다.
  // const [errors, setErrors] = useState({});

  // 🟢 DOM 객체에 직접 접근하려 할 때.. -> 🔵 react-hook-form은 검증 실패 시 자동으로 해당 필드에 포커스를 설정하는 기능을 제공... 별도로 useRef를 사용할 필요가 없으며, 검증 규칙 설정만 하면 됨!
  // name 인풋 요소를 가상 돔으로 가져오기 위해 사용되는 useRef
  // const nameElem = useRef(null);
  // const emailElem = useRef(null);
  // const cellphoneElem = useRef(null);

  // 하나의 이벤트 핸들러로 처리! -> 🔵 더이상 필요 없다.
  // const handleChange = (event) => {
  //   const newUser = { ...user, [event.target.name]: event.target.value };
  //   setUser(newUser);
  // };

  // 🔵 handleSubmit에서 검증을 통과할 경우 호출됨!
  // 🔸 form 태그의 action이라는 Url로 요청을 보내는 automatic behavior⬆️
  // 나중에는 브라우저 기본동작인 form요소의 submit 이벤트 호출을 이용하는 게 아닌, ajax 비동기통신 사용할 예정..
  const onSubmit = (user) => {
    console.log("서버에 전송", user);
    // 브라우저의 기본 동작 취소 (submit 동작 취소)
    // event.preventDefault(); // 내가 알아서 ajax 통해서 서버에 요청 보낼테니까 브라우저 너는 그냥 가만히 있어!

    // 입력 메시지 검증 작업 🔵 검증코드 삭제 -> handleSubmit()이 담당
    //   let newErrors;
    //   if (user.name.trim() === "") {
    //     newErrors = { name: { message: "이름을 입력하세요." } };
    //     nameElem.current.focus();
    //   } else if (user.name.trim().length < 2) {
    //     newErrors = { name: { message: "이름을 2글자 이상 입력하세요." } };
    //     nameElem.current.focus();
    //   } else if (user.email.trim() === "") {
    //     newErrors = { email: { message: "이메일을 입력하세요." } };
    //     emailElem.current.focus();
    //   } else if (user.cellphone.trim() === "") {
    //     newErrors = { cellphone: { message: "휴대폰 번호를 입력하세요." } };
    //     cellphoneElem.current.focus();
    //   } else if (!emailExp.test(user.email)) {
    //     newErrors = {
    //       email: {
    //         message: "이메일 양식에 맞지 않습니다.",
    //       },
    //     };
    //     emailElem.current.focus();
    //   } else if (!cellphoneExp.test(user.cellphone)) {
    //     newErrors = {
    //       cellphone: {
    //         message: "휴대폰 번호 양식에 맞지 않습니다.",
    //       },
    //     };
    //     cellphoneElem.current.focus();
    //   }

    //   if (newErrors) {
    //     // 검증 실패
    //     setErrors(newErrors);
    //   } else {
    //     // 검증 통과
    //     setErrors({});
    //     console.log("서버에 전송", user);
    //   }
    // };
  };
  console.log(errors);

  return (
    <>
      <h1>06 회원가입 입력값 검증 (feat. react-hook-form)</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          // * register(): id속성은 포함하지 않고, 다음의 4개의 값을 포함하는 객체.
          // 1st: name속성에 대한 값
          // 2nd: 검증 작업에 필요한 속성(규칙) - 필수입력/최소길이/정규식 패턴
          {...register("name", {
            required: "이름을 입력하세요.",
            minLength: { value: 2, message: "2글자 이상 입력하세요." },
            pattern: {
              value: /^[^\d]*$/, // 🫸숫자는 포함할 수 없음.
              message: "숫자는 입력할 수 없습니다.",
            },
          })}
          // name="name"
          // value={user.name}
          // onChange={handleChange}
          // ref={nameElem} // 🟢
        />
        <br />
        <div style={{ errorStyle }}>{errors.name?.message}</div>

        <label htmlFor="email">이메일</label>
        <input
          id="email"
          {...register("email", {
            required: "이메일을 입력하세요.",
            pattern: {
              value: emailExp,
              message: "이메일 양식에 맞지 않습니다.",
            },
          })}
        />
        <br />
        <div style={{ errorStyle }}>{errors.email?.message}</div>

        <label htmlFor="cellphone">휴대폰</label>
        <input
          id="cellphone"
          {...register("cellphone", {
            required: "전화번호를 입력하세요.",
            pattern: {
              value: cellphoneExp,
              message: "전화번호 양식에 맞지 않습니다.",
            },
          })}
        />
        <br />
        <div style={{ errorStyle }}>{errors.cellphone?.message}</div>

        <button type="submit">가입</button>
      </form>

      <p>
        이름: {watch("name")}
        <br />
        이메일: {watch("email")}
        <br />
        휴대폰: {watch("cellphone")}
        <br />
      </p>
    </>
  );
}

export default App;
