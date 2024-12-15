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

  // ✍🏼 config는 Axios 요청과 관련된 모든 정보를 포함한 객체(=axios.create()의 인자에 해당하는 값들이 config객체 안에 속함..)
  // 🚧 요청 인터셉터 추가하기
  // 요청 인터셉터는 기본 요청을 설정하는 데 집중...refreshToken과 같은 보안상 민감한 밸류는 포함시키지 않는다..(불필요한 데이터 전송으로 간주됨..-> 네트워크 성능 저하/서버 자원 낭비) => refreshToken은 accessToken이 만료되고 새롭게 발급받을 때만 사용되는 데이터로서, 응답 인터셉터에서 에러가 발생했을 때 따로 처리..
  instance.interceptors.request.use((config) => {
    // 👍 accessToken이 만료되어 새롭게 재발급 받기 위한 REFRESH_URL(/auth/refresh)로의 요청일 경우, config객체의 Authorization 속성값은 이미 refreshToken으로 지정되는 게 기본적인 룰. => 따라서 굳이 REFRESH_URL로 요청을 보냈을 땐(=config.url이 REFRESH_URL일 경우) authorization값을 따로 지정해줄 필요 없다!! (수정된 코드는 굳이굳이 REFRESH_TOKEN일 때, user.refreshToken으로 지정해줬는데, API가 알아서 처리할 거라서 굳이 이렇게 할 필요 없다.)

    // 🗣️ 클라이언트가 API 요청 시:
    // > 기본적으로 accessToken을 Authorization 헤더에 포함하여 요청.
    // > 서버는 accessToken이 유효한지 확인하고 요청을 처리.

    // 💥 accessToken 만료 시:
    // > 클라이언트는 refreshToken을 사용하여 새로운 accessToken을 요청합니다.
    // > 이때, refreshToken은 요청 헤더의 Authorization 속성에 포함됩니다.

    // * 다음 수정된 코드의 의도: REFRESH_URL로 요청을 보낼 때만 Authorization 헤더를 추가하지 않음. (refresh token 요청은 별도 처리)
    if (user && config.url !== REFRESH_URL) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌(수정)❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
    // if (user) {
    //   let token = user.accessToken;
    //   if (config.url === REFRESH_URL) {
    //     token = user.refreshToken;
    //   }
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }

    // ✅ 요청이 전달되기 전에 필요한 공통 작업 수행
    // console.log(config);
    config.params = {
      delay: 500, // 💥 딜레이 타임~~~~~~~~~~~~~~~~~~
      ...config.params, // params에 delay속성이 존재하면 그걸로 쓰고, 없으면 전에 써준 2000으로 덮여 씌어지지 않고 남을 것..
    };
    return config; // 수정된 설정을 반환하여 요청 진행
  });

  // 🚧 응답 인터셉터 추가하기: 응답 데이터와 에러 처리(=> catch 블록에서 굳이 처리할 필요 없다)를 통합적으로 관리하기 위해 작성
  // 응답 인터셉터는 특정 에러 상황(예: 401)을 처리. refreshToken은 응답 인터셉터에서 필요한 경우에만 사용하는 것이 안전하고 효율적인 처리 방식...
  // 요청 인터셉터는 accessToken 설정에만 집중하고, refreshToken 관련 처리는 응답 인터셉터에서 401 에러 상황을 감지해 처리하는 구조로 설계
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
          // 1️⃣ refresh token 만료된 경우,
          navigateLogin();
        } else if (user) {
          // 2️⃣ 로그인 했으나 access token 만료된 경우,
          // refreshToken을 이용해(-> 여기서만 이용되는 민감한 데이터!!) accessToken 재발급
          const {
            data: { accessToken },
          } = await instance.get(REFRESH_URL, {
            headers: {
              Authorization: `Bearer ${user.refreshToken}`,
            },
          });
          // 👉 전역 상태 관리에서 새로운 accessToken으로 ✨유저 정보를 업데이트✨하기 위한 것
          // user 객체: 유저의 인증 정보를 담고 있는 상태이며, 로그인 상태를 유지하거나 ✨다른 컴포넌트에서 유저 데이터를 참조✨할 때(=> 자동 리렌더링 발생) 사용
          setUser({ ...user, accessToken });

          // 👉 새로운 accessToken을 헤더에 추가
          config.headers.Authorization = `Bearer ${accessToken}`;

          // 👉 헤더를 업데이트한 상태로 원래 요청을 재전송
          // axios(config) === 원래 요청 (재전송)
          // config는 처음 요청을 보낼 때 사용했던 설정 객체(요청 URL, 헤더, 메서드, 바디 등)를 그대로 담고 있다.
          // 새로운 accessToken을 헤더에 추가한 상태로 원래의 API 요청을 다시 서버로 보낸다는 뜻.
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
