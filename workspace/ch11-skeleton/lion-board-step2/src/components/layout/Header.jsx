import ThemeButton from "@components/ThemeButton";
import useUserStore from "@zustand/userStore";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, resetUser } = useUserStore();

  const handleLogout = (e) => {
    e.preventDefault();
    resetUser(); // user 상태를 null값으로 초기화시키는 함수..
    // 로그아웃시, user를 구독하고 있는 모든 컴포넌트가 리렌더링되어야 함.
    // 상세페이지, 헤더부분, 댓글의 삭제버튼...등등 모두 다 사라져야 함.
    // 특정 컴포넌트 내부에 저장할게 아닌, 애플리케이션 전역상태로서 저장하는게 효율적.
    // 라이브러리 사용 - Redux(굉장히 많은 초기파일-bolierplate 필요!), Mobx => 대규모 프로젝트에서 쓰임.
  };

  return (
    <header className="px-8 min-w-80 bg-slate-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <nav className="flex flex-wrap justify-center items-center p-4 md:flex-nowrap md:justify-between">
        <div className="w-1/2 order-1 md:w-auto">
          <Link to="/" className="flex items-center gap-2">
            <img
              className="mr-3 h-6 sm:h-9"
              src="/images/favicon.svg"
              width="40"
              height="40"
              alt="로고 이미지"
            />
            <span className="text-lg font-bold">멋사컴</span>
          </Link>
        </div>
        <div className="w-auto order-2 text-base mt-4 md:mt-0">
          <ul className="flex items-center gap-6 uppercase">
            <li className="hover:text-amber-500 hover:font-semibold">
              <Link to="/info">정보공유</Link>
            </li>
            <li className="hover:text-amber-500 hover:font-semibold">
              <Link to="/free">자유게시판</Link>
            </li>
            <li className="hover:text-amber-500 a:font-semibold">
              <Link to="/brunch">브런치스토리</Link>
            </li>
          </ul>
        </div>

        <div className="w-1/2 order-1 flex justify-end items-center md:order-2 md:w-auto">
          {user ? (
            <form onSubmit={handleLogout}>
              <p className="flex items-center">
                {user.profile && (
                  <img
                    className="w-8 rounded-full mr-2"
                    src={`https://11.fesp.shop${user.profile}`}
                    width="40"
                    height="40"
                    alt="프로필 이미지"
                  />
                )}
                {user.name} 님 :)
                <button
                  type="submit"
                  className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                >
                  로그아웃
                </button>
              </p>
            </form>
          ) : (
            <div className="flex justify-end">
              <Link
                to="/users/login"
                className="bg-orange-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              >
                로그인
              </Link>
              <Link
                to="/users/signup"
                className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              >
                회원가입
              </Link>
            </div>
          )}

          <ThemeButton />
        </div>
      </nav>
    </header>
  );
}
