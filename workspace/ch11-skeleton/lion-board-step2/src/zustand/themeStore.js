import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const ThemeStore = (set) => ({
  // 사용자의 선호도와 무관하게 처음에는 강제로 라이트모드로 설정(하드코딩)
  // isDarkMode: false,

  // 사용자의 기존 설정에 맞게 다크모드 정의
  // 1️⃣ window.matchMedia("(prefers-color-scheme: dark)"): 사용자의 시스템이 다크 모드를 선호하는지 여부를 나타내는 MediaQueryList 객체를 반환
  // 2️⃣ .matches: 그 객체가 다크 모드에 맞는지 확인하고, 맞다면 true를, 아니라면 false를 반환합니다.
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? true
    : false,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })), // 상태를 받아와서 지정한 객체를 반환하도록..
  // user: null,
  // setUser: (user) => set({ user }),
  // resetUser: () => set({ user: null }),
});

// const useUserStore = create(UserStore); // ✅ 스토리지 사용하지 않을 경우..

// ✅ 스토리지 사용할 경우..
const useThemeStore = create(
  persist(ThemeStore, {
    name: "themeStore",
    // storage: createJSONStorage(() => sessionStorage),
    // storage: createJSONStorage(), // 기본은 localStorage -> 💥💥아예 설정 자체를 안해야, Localstorage로 설정💥💥
  })
);

export default useThemeStore;
