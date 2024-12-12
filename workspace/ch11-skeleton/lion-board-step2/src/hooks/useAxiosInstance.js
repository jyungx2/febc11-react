// 호출한 후에 통신하는 코드를 따로 작성
import useUserStore from "@zustand/userStore";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// ✅ accessToken 재발급 받을 때, 우리가 요청해야 할 URL
const REFRESH_URL = "/auth/refresh";

function useAxiosInstance() {
  const { user, setUser } = useUserStore();

  // 페이지를 이동할 때 사용하는 훅: Link를 써도 페이지 이동을 시킬 수 있지만 ❎단순하게 이동❎만 시켜야 하는 경우 Link를 사용하면 좋고, useNavigate를 사용하면 "특정 이벤트가 실행됐을 때 동작"하도록 하거나 "추가적인 로직이 필요"한 경우
  const navigate = useNavigate();
  const location = useLocation();

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
    // 👍 refresh 요청일 경우 Authorization 헤더는 이미 refresh token으로 지정되어 있음
    if (user && config.url !== REFRESH_URL) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌(수정)❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
    // if (user) {
    //   let token = user.accessToken;
    //   if (config.url === REFRESH_URL) {
    //     token = user.refreshToken;
    //   }
    //   // config.headers["Authorization"] = `Bearer ${user.accessToken}`;
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }

    // 요청이 전달되기 전에 필요한 공통 작업 수행
    // console.log(config);
    config.params = {
      delay: 500, // 💥 딜레이 타임~~~~~~~~~~~~~~~~~~
      ...config.params, // params에 delay속성이 존재하면 그걸로 쓰고, 없으면 전에 써준 2000으로 덮여 씌어지지 않고 남을 것..
    };
    return config; // 수정된 설정을 반환하여 요청 진행
  });

  // 🚧 응답 인터셉터 추가하기: 응답 데이터와 에러 처리(=> catch 블록에서 굳이 처리할 필요 없다)를 통합적으로 관리하기 위해 작성
  instance.interceptors.response.use(
    (response) => {
      // 2xx 범위에 있는 상태 코드는 이 함수가 호출됨
      // 응답 데이터를 이용해서 필요한 공통 작업 수행

      return response;
    }, // 👍 수정된 아래 코드
    async (error) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리
      console.error("인터셉터", error);
      const { config, response } = error;

      if (response?.status === 401) {
        // 인증 실패
        if (config.url === REFRESH_URL) {
          // refresh token 만료
          navigateLogin();
        } else if (user) {
          // 로그인 했으나 access token 만료된 경우
          // refresh 토큰으로 access 토큰 재발급 요청
          const {
            data: { accessToken },
          } = await instance.get(REFRESH_URL, {
            headers: {
              Authorization: `Bearer ${user.refreshToken}`,
            },
          });
          setUser({ ...user, accessToken });
          // 갱신된 accessToken으로 재요청
          config.headers.Authorization = `Bearer ${accessToken}`;
          return axios(config);
        } else {
          // 로그인 안한 경우
          navigateLogin();
        }
      }
      return Promise.reject(error);
    }
  );

  function navigateLogin() {
    const gotoLogin = confirm(
      "로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?"
    );
    gotoLogin &&
      // 1. 첫번째 인자: 이동시킬 페이지의 주소 를 넣거나 -1 과 같은 값을 넣어 뒤로가기
      // 2. 두번째 인자: 선택사항(옵션)인데 {replace : true} 로 설정하는 경우 새 항목을 추가하는 대신 기록 스택의 현재 항목을 대체
      navigate("/users/login", { state: { from: location.pathname } });
  }

  // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌(수정)❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
  //   },
  //   async (error) => {
  //     // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
  //     // 공통 에러 처리
  //     console.error("인터셉터", error);
  //     const { config, response } = error;

  //     // 🗣️ Server says...만료된 accessToken을 보내서 인증을 못해. refreshToken 좀 줘봐. 새로 교체해줄게.
  //     if (response?.status === 401) {
  //       // 🚨 인증 실패시 서버가 보내주는 응답 상태 코드 = 401 (401 Unauthorized)
  //       // 1️⃣ refreshToken 조차도 만료될 경우 => 다시 로그인하는 방법밖에 없음
  //       // : REFRESH_URL은 refreshToken을 사용하여 새로운 accessToken을 요청하는 전용 엔드포인트.
  //       if (config.url === REFRESH_URL) {
  //         const gotoLogin = confirm(
  //           "로그인 후에 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?"
  //         );
  //         gotoLogin &&
  //           navigate("/users/login", { state: { from: location.pathname } });
  //       } else {
  //         // 2️⃣ 유효한 refreshToken으로 accessToken을 재발급 요청
  //         // : REFRESH_URL이 아닌 모든 URL에서 401을 받았다는 것은, 네가 로그인을 안 했거나, accessToken이 만료됐다는 뜻
  //         const accessToken = await getAccessToken(instance);

  //         if (accessToken) {
  //           // 갱신된 accessToken으로 요청을 다시 보냄
  //           config.headers.Authorization = `Bearer ${accessToken}`;
  //           return axios(config);
  //         }
  //       }
  //     } else {
  //       // ❓ 인증 실패가 아닌 다른 에러일 경우..
  //       return Promise.reject(error);
  //     }
  //   }
  // );

  // accessToken 재발급
  async function getAccessToken(instance) {
    try {
      const {
        data: { accessToken },
      } = await instance.get(REFRESH_URL);
      setUser({ ...user, accessToken }); // 기존의 만료된 accessToken을 새롭게 발급받은 accessToken으로 교체!
      return accessToken;
    } catch (err) {
      console.error(err);
    }
  }

  return instance;
}

export default useAxiosInstance;
