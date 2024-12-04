import { useEffect, useState } from "react";

const API_SERVER = "https://todo-api.fesp.shop/api";

// 커스텀훅: 함수의 매개변수에 fetchParams을 넣어준다. (이전에 App.jsx에서는 fetchTodo라는 비동기함수의 매개변수로 넣어줬다.)
// 팀프로젝트 초기에 만들어놓고 사용하면 굉장히 편하고 효율적!
function useFetch(fetchParams) {
  // 서버로부터 받은 응답 데이터
  const [data, setData] = useState(null);

  // 에러 메시지
  const [error, setError] = useState(null);

  // 로딩중 상태
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // const fetchParams = { url: "/todolist?delay=3000" };
    request(fetchParams);
  }, []); // 마운트 된 후 한번만 호출(원래는 로그인/에러메시지/응답도착시 마다 호출되는 건데, []을 써줌으로써 딱 한번만 호출하도록!)

  // API 서버에 Fetch API로 ajax 요청을 보낸다.
  const request = async (params) => {
    try {
      setIsLoading(true); // ⏳로딩 작업
      const res = await fetch(API_SERVER + params.url);
      const jsonData = await res.json();
      console.log(jsonData);

      if (jsonData.ok) {
        setData(jsonData);
        setError(null);
      } else {
        throw new Error(jsonData.error.message);
      }
    } catch (err) {
      console.error(err);
      setError({
        message:
          "일시적인 문제로 인해 작업 처리에 실패했습니다. 잠시후 다시 요청해 주시기 바랍니다.",
      });
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading };
}

export default useFetch;
