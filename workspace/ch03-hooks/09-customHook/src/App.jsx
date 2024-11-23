import useAxios from "@hooks/useAxios";
import useFetch from "@hooks/useFetch";
import { PacmanLoader } from "react-spinners";

// const API_SERVER = "https://todo-api.fesp.shop/api";

function App() {
  const { data, error, isLoading } = useAxios({ url: "/todolist?delay=1000" });
  // const [data, setData] = useState([]);
  // const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  // const fetchTodo = async (fetchParams) => {
  //   try {
  //     setIsLoading(true); // ⏳로딩 작업
  //     const res = await fetch(API_SERVER + fetchParams.url);
  //     const jsonData = await res.json();
  //     console.log(jsonData);

  //     if (jsonData.ok) {
  //       setData(jsonData.items);
  //       setError(null);
  //     } else {
  //       throw new Error(jsonData.error.message);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError({
  //       message:
  //         "일시적인 문제로 인해 작업 처리에 실패했습니다. 잠시후 다시 요청해 주시기 바랍니다.",
  //     });
  //     setData(null);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <h1>09 Custom Hook - useFetch, useAxios 커스텀 훅 사용</h1>
      <h2>할일 목록</h2>
      {/* ⏳ 로딩 작업 */}
      {isLoading && <PacmanLoader />}
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
      <ul></ul>
    </>
  );
}

export default App;
