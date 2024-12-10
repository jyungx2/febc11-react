import { Link, useNavigate, useOutletContext } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { useForm } from "react-hook-form";

function TodoEdit() {
  // Outlet 컴포넌트의 context 속성에 전달되는 값 추출
  // ❓ 만약 Layout의 <Outlet/>의 context 속성값도 받고 싶다면, 이경우 부모의 부모이기 때문에 직계부모인 TodoDetail이 context={context}로 넘겨줘야 사용가능하다. 아니면 undefined 출력.
  const { item, refetch } = useOutletContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: item.title,
      content: item.content,
      done: item.done,
    },
  });

  // axios 인스턴스
  const axios = useAxiosInstance();

  // 수정 작업
  // 🌟 useForm에서 제공하는 formData는 폼 데이터의 키-값 쌍을 수집하고 처리할 수 있도록 도와주는 역할을 합니다. register 함수로 연결된 각 입력 필드의 값들은 formData 객체로 자동으로 수집되어, handleSubmit(onSubmit)의 onSubmit에게 전달되어 유효성검사 실행. => post, patch 실행시, formData
  const onSubmit = async (formData) => {
    try {
      // event.preventDefault();
      // TODO: API서버에 수정 요청
      // useAxios({
      //   url: "/todolist",
      //   method: "PATCH",
      //   body: { title: "", content: "" },
      // });
      await axios.patch(`/todolist/${item._id}`, formData);

      alert("할일이 수정 되었습니다.");

      // TODO: 할일 상세보기로 이동
      // 리액트 라우터 제공 훅: 프로그래밍 방식으로 '페이지 이동'에 사용
      // navigate("..", { relative: true }); // 상대 경로로 이동
      // navigate(`/list/${item._id}`, { replace: true }); // (=window.history.replacestate()) : replace 지정하면 뒤로가기 눌렀을 때 또 상세페이지가 나옴 - 두번 눌러야 수정화면으로 돌아감

      // ✅ 적절한 흐름(이동방법) 선택!
      // 1. replace: X (pushState) - 목록>상세>"수정">상세 :뒤로가기시, 수정으로
      // 2. replace: true (replaceState) - 목록>상세>상세(x"수정"x):뒤로가기시, 상세로
      // => 💥'목록>상세>수정' 흐름이 자연스러움💥
      // /list/을 붙여줘서 뒤로가기 -> 리스트로 이동

      navigate(-1); // 숫자전달(= window.history.back)
      refetch(); // 🌼 fetchDetail() 호출!
    } catch (err) {
      console.log(err);
      alert("할일 수정에 실패하였습니다.");
    }
  };

  return (
    <>
      <h2>할일 수정</h2>
      <div className="todo">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* defaultValue,Chekced: 원래 HTML 요소의 속성을 설정 .. 그냥 value로 하면 state값을 이용해 제어 컴포넌트로 만들어져 이 상태값을 꺼낼라면 onChange라는 함수가 필요한데, 안써주면 에러 나므로. */}
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
          <textarea
            id="content"
            cols="23"
            rows="5"
            {...register("content", {
              required: "내용을 입력하세요",
            })}
          />
          <div className="input-error">{errors.content?.message}</div>
          <br />
          <label htmlFor="done">완료 :</label>
          <input type="checkbox" id="done" {...register("done")} />
          <br />
          {/* <Link to="/list/1">수정</Link> */}
          <button type="submit">수정</button>
          <Link to={`/list/${item._id}`}>취소</Link>
        </form>
      </div>
    </>
  );
}

export default TodoEdit;
