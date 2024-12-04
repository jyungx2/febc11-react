import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function TodoAdd() {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();

  /////////////////////////////////////////////
  // 등록하고 바로 목록으로 이동 - useQuery, useMutation배울 때 함께 사용
  const axios = useAxiosInstance();

  // 이전 페이지 이동
  const navigate = useNavigate();

  // 목록 조회에 대한 모든 작업을 무효화 ... 사용자가 글을 추가하면, 해당 글은 목록으로 돌아갔을 때 무조건 바로 나와야 하므로 이전 캐시들을 다 무효화시키고, 다시 업데이트 - 리렌더링
  const queryClient = useQueryClient();

  // 💫 밑에 form요소의 handleSubmit()의 매개변수로서 onSubmit 대신에 쓰일 함수..
  const addItem = useMutation({
    mutationFn: (item) => {
      axios.post("/todolist", item);
    }, // onSubmit()이 item을 받기 때문에 얘도 item 받아야지.
    onSuccess: () => {
      alert("할일이 추가 되었습니다.");
      // 지정한 키의 쿼리의 '캐시'를 무효화
      queryClient.invalidateQueries(["todolist"]);
      // 할 일 목록으로 이동
      navigate(-1);
    },
    onError: (err) => {
      console.error("서버에서 에러 응답");
      alert(err?.message || "할일 추가에 실패했습니다.");
    },
  });

  // handleSubmit에서 검증을 통과할 경우 호출됨
  const onSubmit = (item) => {
    console.log("서버에 전송", item);

    const timer = setTimeout(() => {
      xhr.abort(); // 요청 취소
    }, 2000);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://todo-api.fesp.shop/api/todolist");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.responseType = "json"; // xhr.response에 저장되는 응답 데이터가 JSON.parse() 결과로 저장됨

    // 서버로부터 응답이 도착하면 호출되는 함수
    xhr.onload = () => {
      // clearTimeout(timer);

      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr.response);
        alert("할일이 추가 되었습니다.");
        setFocus("title");
        reset();
      } else {
        // 4xx, 5xx
        console.error("서버에서 에러 응답", xhr.status, xhr.response);
        alert(xhr.response.error?.message || "할일 추가에 실패했습니다.");
      }
    };

    // xhr.onabort = () => {
    //   alert("타임 아웃");
    // };

    xhr.onerror = () => {
      console.error("네트워크 오류");
      alert("할일 추가에 실패했습니다.");
    };

    xhr.send(JSON.stringify(item));
  };

  return (
    <div id="main">
      <h2>할일 추가</h2>
      <div className="todo">
        {/* 💫 onSubmit -> addItem.mutate */}
        {/* react-hook-form의 handleSumbit을 통해 검증이 끝난 사용자 입력 객체가 자동으로 addItem.mutate의 인수로 넘어온다 */}
        {/* 밑에처럼 굳이 arrow function 하나 더 만들어서 쓸 필요 없으니까 그냥 addItem.mutate만 써주는게 더 효율적! */}
        {/* <form onSubmit={handleSubmit(addItem.mutate)}> */}
        {/* ✅ shorthand & longhand version의 arrow function */}
        <form
          onSubmit={handleSubmit((item) => {
            addItem.mutate(item);
          })}
        >
          <label htmlFor="title">제목 :</label>
          <input
            type="text"
            id="title"
            autoFocus
            // ⭐️ react-hook-form의 useForm() 훅의 사용방식 : register에 등록한 값을 handleSubmit이 접근해서 검증을 진행한뒤, 검증 성공 시에만 사용자 입력값을 객체 형태로 handleSubmit()의 인자로 넣어준 함수에 전달하는 방식
            // register: 객체를 반환하는 함수 - 속성으로 ref={}가 자동으로 저장
            {...register("title", {
              required: "제목을 입력하세요.",
            })}
          />
          <div className="input-error">{errors.title?.message}</div>
          <br />
          <label htmlFor="content">내용 :</label>
          <textarea
            id="content"
            cols="23"
            rows="5"
            {...register("content", {
              required: "내용을 입력하세요.",
            })}
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
