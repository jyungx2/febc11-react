import { useRouteError } from "react-router-dom";

function ErrorPage() {
  // 💡 useRouteError (err = 객체)
  const err = useRouteError();
  const message =
    err.status === 404
      ? "💥 존재하지 않는 페이지입니다."
      : "💣 예상하지 못한 에러가 발생했습니다.";

  return (
    <div id="main">
      <div className="todo">
        <h2>에러 발생</h2>
        {message}
      </div>
    </div>
  );
}

export default ErrorPage;
