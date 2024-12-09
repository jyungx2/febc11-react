import useAxiosInstance from "@hooks/useAxiosInstance";
import CommentList from "@pages/board/CommentList";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

export default function Detail() {
  // 🖍️error -> toast로 보여주자
  // 🖍️isLoading -> suspense로 처리하자

  const axios = useAxiosInstance();

  // List.jsx에 있는 useQuery부분 복사해옴 + _id 파라미터만 추가
  const { type, _id } = useParams(); // localhost/:type => type: info
  // /✨:type✨
  // localhost/✨info✨ => useParams()의 리턴값 : { type: ✨info✨ }
  // localhost/✨free✨ => useParams()의 리턴값 : { type: ✨free✨ }
  // localhost/✨qna✨ => useParams()의 리턴값 : { type: ✨qna✨ }

  // 어떤 파라미터(useParams())가 왔냐에 따라서, url 뒤에 해당 파라미터값을 붙일 수 있다.
  const { data } = useQuery({
    queryKey: ["posts", _id],
    queryFn: () => axios.get(`/posts/${_id}`, { params: { type } }),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });
  console.log(data);

  if (!data) {
    return <div>로딩중...</div>;
  }

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <form action="/info">
          <div className="font-semibold text-xl">
            제목 : 좋은 소식이 있습니다.
          </div>
          <div className="text-right text-gray-400">작성자 : 제이지</div>
          <div className="mb-4">
            <div>
              <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
                좋은 소식을 가지고 왔습니다.
                <br />
                오늘 드디어 최종 면접을 합니다.
                <br />
                많이 응원해 주세요^^
              </pre>
            </div>
            <hr />
          </div>
          <div className="flex justify-end my-4">
            <Link
              // 목록으로 가는 링크: 절대경로로 수정
              to={`/${type}`}
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              목록
            </Link>
            <Link
              // 수정으로 가는 링크: 절대경로로 수정
              to={`/${type}/${_id}/edit`}
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              수정
            </Link>
            <button
              type="submit"
              className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              삭제
            </button>
          </div>
        </form>
      </section>

      <CommentList />
    </main>
  );
}
