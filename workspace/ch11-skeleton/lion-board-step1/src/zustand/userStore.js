import { create } from "zustand";
// 굳이 영구적인 저장을 위해 session storage를 생성할 필요없이 zustand에서 제공하는 훅 사용하면 됨..
import { persist, createJSONStorage } from "zustand/middleware";

// 새로고침 해도 로그인 상태가 유지되도록,, 어딘가에 로그인 상태를 저장해야하는데,
// 이때 쓰기 가장 편한 것은 WebStorage...(cookie보다?)
// 1. 브라우저 종료될 때 같이 사라지는 데이터는 Session storage에 저장 (수명 짧음)
// 2. 컴퓨터 재부팅돼도 사라지지 않는 중요하지 않은 데이터는 Local storage에 저장 (수명 김)
const useUserStore = create(
  persist(
    (set) => ({
      // user = zustand에서 저장할 상태값
      // => 로그인 여부를 판단하는 상태값, Null이면 로그아웃된 상태.
      // Null이 아니면 로그인된 상태..
      user: null,
      setUser: (user) => set({ user }),
      resetUser: () => set({ user: null }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage), // 기본은 localStorage를 리턴..
      // 우리는 세션에 저장하고 싶으니 sessionStorage를 리턴
    }
  )
);

export default useUserStore;
