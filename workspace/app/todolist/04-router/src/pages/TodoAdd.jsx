import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// ✅ useForm
// useForm의 옵션은 폼 검증과 상태 업데이트의 타이밍을 결정
function TodoAdd() {
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({
    mode: "onSubmit", // 최초 검증 시점, ✨default: onSubmit(Submit/Blur/Focus 중에 결정)
    revalidateMode: "onChange", // 재검증 시점, ✨default: onChange(가장 많이 사용..-> ❓굳이왜필요)
    criteriaMode: "all", // errors 객체에 첫 오류 하나만 포함하거나(firstError) 전부 포함(all), ✨default: firstError
    defaultValues: { title: "", content: "" },
  });

  // ✨ XMLHttpRequest()객체를 이용해 Ajax 통신
  const onSubmit = (item) => {
    console.log("서버에 전송", item);

    const timer = setTimeout(() => {
      xhr.abort(); // 일정시간 지난 뒤,중간에 요청 취소
    }, 2000);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://todo-api.fesp.shop/api/todolist?delay=100000000");
    xhr.setRequestHeader("Content-Type", "application/json"); // Header : 문자열로 보낼테니까 너가 알아서 parsing해서 써.
    xhr.responseType = "json"; // xhr.response에 저장되는 응답 데이터가 JSON.parse()의 결과로 저장됨 -> 우리가 따로 Parsing 안해도 됨!

    // 서버로부터 응답이 도착하면 호출되는 함수
    xhr.onload = () => {
      clearTimeout(timer);
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr.response);
        alert("할 일이 추가되었습니다.");
        setFocus("title"); // useRef 대신에 useForm의 속성 setFocus 사용.
        reset();
      } else {
        // 4xx, 5xx
        // 💥논리적인 에러 (타이틀/내용 모두 필수요건)
        console.log("서버에서 에러 응답", xhr.status, xhr.response);
        alert(xhr.response.error?.message || "할 일 추가에 실패했습니다."); // 👉 응답의 에러가 있으면 에러메시지를 보여주고, 없으면 실패했다는 메시지만
      }
    };

    xhr.onabort = () => {
      alert("타임 아웃");
    };

    // 💥물리적인 에러(네트워크 연결 불가)
    xhr.onerror = () => {
      console.error("네트워크 오류");
      alert("할일 추가에 실패했습니다.");
    };

    xhr.send(JSON.stringify(item)); // send()의 매개변수: POST형식의 body (JSON형식의 문자로 바꿔서 보낸다!)
  };

  return (
    <div id="main">
      <h2>할일 추가</h2>
      <div className="todo">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">제목 :</label>
          <input
            type="text"
            id="title"
            autoFocus
            {...register("title", {
              required: "제목을 입력하세요",
            })}
          />
          <div className="input-error">{errors.title?.message}</div>
          <br />
          <label htmlFor="content">내용 :</label>
          {/* id는 HTML 요소의 식별자일 뿐이고, register의 name이 데이터를 구분하는
          역할(defaultValues와도 연결되어 초기값을 설정하거나, 폼 제출 시 데이터를 구분하는 키로 사용됨) */}
          <textarea
            id="content"
            cols="23"
            rows="5"
            {...register("content", {
              required: "내용을 입력하세요",
            })}
            // <input
            //   name="content"🌟 -> 1st parameter
            //   onChange={someFunction}
            //   onBlur={anotherFunction}
            //   ref={refCallback}
            // />
          />
          <div className="input-error">{errors.content?.message}</div>
          <br />
          <button type="submit">추가</button>
          <Link to="/list">취소</Link>
        </form>
      </div>
    </div>
  );
}

export default TodoAdd;
