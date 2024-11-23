import useAxios from "@hooks/useAxios";
// import useFetch from "@hooks/useFetch";
import { PacmanLoader } from "react-spinners";

// const API_SERVER = "https://todo-api.fesp.shop/api";

function App() {
  // delay=1000: 서버 요청 시 강제로 1초(1000ms)의 지연을 추가합니다.
  // 실제 응답 시간은 이 지연 시간(1000ms) + 네트워크 전송 시간 + 서버 처리 시간 등을 포함합니다. 따라서 1500ms 내에 응답하지 못할 가능성이 큽니다.
  const { data, error, isLoading } = useAxios({ url: "/todolist?delay=1000" });

  return (
    <>
      <h1>09 Custom Hook - useFetch, useAxios 커스텀 훅 사용</h1>
      <h2>할일 목록</h2>
      {/* ⏳ 로딩 작업 */}
      {isLoading && <PacmanLoader color="#5eeb34" size={18} />}
      {/* 🧨 message 속성 이용해 유저에게 에러메시지 보여줌 */}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {/* &&: data가 있으면 data를 다음과 같이 출력해라. */}
      {data && (
        <ul>
          {data.items.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
