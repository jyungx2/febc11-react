import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

// API 서버와 React를 동시에 이용해 만든 전형적인 기본코드
const API_SERVER = "https://todo-api.fesp.shop/api";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Todo API 서버에 ajax요청을 보낸다.
  const fetchTodo = async (fetchParams) => {
    try {
      setIsLoading(true); // ⏳로딩 작업
      const res = await fetch(API_SERVER + fetchParams.url);
      const jsonData = await res.json();
      console.log(jsonData);
      // 응답이 정상적으로 왔을 때(ok=1...true) 리스트 리턴
      // 화면 출력은 리액트가 해줄테니, 너는 상태만 관리해라 -> stateSystem
      if (jsonData.ok) {
        setData(jsonData.items);
        setError(null); // ✅에러발생했다가, 다시 정상적으로 데이터가 들어오면 기존의 에러 삭제함!
      } else {
        throw new Error(jsonData.error.message);
      }
    } catch (err) {
      // 💥네트워크 자체에 대한 에러가 발생했을 때 실행(ex. API 서버 주소가 이상)
      console.error(err);

      // 사용자에게 적절한 오류메시지 보여주는 작업 진행 - message 속성 이용
      setError({
        message:
          "일시적인 문제로 인해 작업 처리에 실패했습니다. 잠시후 다시 요청해 주시기 바랍니다.",
      });
      setData(null); // ✅반대로, 정상적이었다가 갑자기 에러가 발생했을 때, 기존 데이터 삭제!
    } finally {
      setIsLoading(false); // ⏳로딩 작업
    }
  };

  // 유저가 수정/삭제/추가 하면서 API 서버로부터 반환되는 결과가 다를 수 있다.
  // => 화면 리렌더링됨 => 사이드 이펙트 발생 가능성 => useEffect() 사용
  useEffect(() => {
    const fetchParams = { url: "/todolist?delay=3000" };
    fetchTodo(fetchParams);
  }, []);

  // *delay param: 의도적으로 server가 3초 뒤에 응답하게 만들 수 있는 파라미터

  return (
    <>
      <h1>08 Custom Hook - 커스텀 훅 없이 fetch API 사용</h1>
      <h2>할일 목록</h2>
      {/* ⏳ 로딩 작업 */}
      {isLoading && <PacmanLoader />}
      {/* 🧨 message 속성 이용해 유저에게 에러메시지 보여줌 */}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {/* &&: data가 있으면 data를 다음과 같이 출력해라. */}
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      )}
      <ul></ul>
    </>
  );
}

export default App;
