// 호출한 후에 통신하는 코드를 따로 작성
import useUserStore from "@zustand/userStore";
import axios from "axios";

function useAxiosInstance() {
  // const { user } = useUserStore();
  const instance = axios.create({
    baseURL: "https://11.fesp.shop",
    timeout: 1000 * 15, // 15초 지나면 API 요청 정상적으로 설정해도 에러 발생
    headers: {
      "Content-Type": "application/json", // request의 데이터 타입
      accept: "application/json", // response의 데이터 타입
      "client-id": "00-board",
    },
  });

  // 🚧 요청 인터셉터 추가하기
  instance.interceptors.request.use((config) => {
    // if (user) {
    //   config.headers["Authorization"] = `Bearer ${user.accessToken}`;
    // }

    // 요청이 전달되기 전에 필요한 공통 작업 수행
    // console.log(config);
    config.params = {
      delay: 500, // 💥 딜레이 타임~~~~~~~~~~~~~~~~~~
      ...config.params, // params에 delay속성이 존재하면 그걸로 쓰고, 없으면 전에 써준 2000으로 덮여 씌어지지 않고 남을 것..
    };
    return config;
  });

  // 🚧 응답 인터셉터 추가하기: 응답 데이터와 에러 처리(=> catch 블록에서 굳이 처리할 필요 없다)를 통합적으로 관리하기 위해 작성
  instance.interceptors.response.use(
    (response) => {
      // 2xx 범위에 있는 상태 코드는 이 함수가 호출됨
      // 응답 데이터를 이용해서 필요한 공통 작업 수행

      // if (response.data?.ok !== undefined) {
      //   response.data.ok = !!response.data.ok; // true -> 1 / false -> 0
      // }
      return response;
    },
    (error) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리
      console.error("인터셉터", error);

      // 💫 interceptor가 에러 처리 했으므로 굳이 안해도 괜찮.
      // const message = "잠시 후 다시 요청하세요.";
      // error.message = message;

      // 💫 alert창으로 에러 처리 -> 확인 버튼 누르기 전까진 브라우저는 아무것도 할 수 없기 때문에 잘 쓰이지 않는다.. UX에 좋지 않다. -> 대신 'react toastify' 라이브러리 사용

      // toast.error(message);
      return Promise.reject(error);
    }
  );

  return instance;
}

export default useAxiosInstance;
