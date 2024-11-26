import { useEffect, useState } from "react";
import axios from "axios";

// ✨ axios 내장 기능 ✨
axios.defaults.baseURL = "https://todo-api.fesp.shop/api";
// 1.5초 지나도록 안오면 에러 발생..
// axios.defaults.timeout으로 설정된 1500ms는 클라이언트가 기다릴 수 있는 최대 시간을 설정합니다. 서버 지연 + 네트워크 오버헤드가 1500ms를 초과하면 타임아웃 에러가 발생합니다.
axios.defaults.timeout = 2500;

// 커스텀훅: 함수의 매개변수에 fetchParams을 넣어준다. (이전에 App.jsx에서는 fetchTodo라는 비동기함수의 매개변수로 넣어줬다.)
// 팀프로젝트 초기에 만들어놓고 사용하면 굉장히 편하고 효율적!
function useAxios(fetchParams) {
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
      const res = await axios(params.url);
      // const jsonData = await res.json();
      // console.log(jsonData);
      setData(res.data);
      setError(null);

      // fetch와 다르게 응답상태코드가 200번대가 아니면 전부 다 catch 블럭으로 보내버린다. - 목록 데이터는 안써도 되는데 , 범용적으로 쓰기 위해 다음 코드 추가
      // if (jsonData.ok) {
      //   setData(jsonData.items);
      //   setError(null);
      // } else {
      //   throw new Error(jsonData.error.message);
      // }
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

export default useAxios;
