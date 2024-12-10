import { create } from "zustand";

const useUserState = create((set, get) => ({
  // user = zustand에서 저장할 상태값
  // => 로그인 여부를 판단하는 상태값, Null이면 로그아웃된 상태.
  // Null이 아니면 로그인된 상태..
  user: null,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}));

export default useUserState;
