import useAxiosInstance from "@hooks/useAxiosInstance";
import CommentList from "@pages/board/CommentList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Detail() {
  // 🖍️error -> toast로 보여주자
  // 🖍️isLoading -> suspense로 처리하자

  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // List.jsx에 있는 useQuery부분 복사해옴 + _id 파라미터만 추가
  const { type, _id } = useParams(); // localhost/:type => type: info
  // /✨:type✨
  // localhost/✨info✨ => useParams()의 리턴값 : { type: ✨info✨ }
  // localhost/✨free✨ => useParams()의 리턴값 : { type: ✨free✨ }
  // localhost/✨qna✨ => useParams()의 리턴값 : { type: ✨qna✨ }

  // 어떤 파라미터(useParams())가 왔냐에 따라서, url 뒤에 해당 파라미터값을 붙일 수 있다.
  const { data } = useQuery({
    queryKey: ["posts", _id], // CommentNew에서 댓글 업데이트할 때 staleTime을 거스르고 쿼리를 무효화시킬 때 필요한 key 배열
    queryFn: () => axios.get(`/posts/${_id}`, { params: { type } }),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });
  console.log(data);

  const removeItem = useMutation({
    mutationFn: (_id) => axios.delete(`/posts/${_id}`),
    onSuccess: () => {
      alert("게시물이 삭제되었습니다.");
      // 현재 페이지 pathname: /free/:_id
      queryClient.invalidateQueries({ queryKey: ["posts", type] });
      navigate(`/${type}`);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    removeItem.mutate(_id);
  };

  if (!data) {
    return <div>로딩중...</div>;
  }

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <form onSubmit={onSubmit}>
          <div className="font-semibold text-xl">제목 : {data.item.title}</div>
          <div className="text-right text-gray-400">
            작성자 : {data.item.user.name}
          </div>
          <div className="mb-4">
            <div>
              <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
                {data.item.content}
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

      {/* data의 replies라는 속성을 보면 게시글마다 달린 댓글들이 보인다! => 댓글리스트를 화면에 출력하는 작업시, 상세 컴포넌트에서 받아온 데이터를 가지고, replies배열을 prop으로 전달해서 사용하고 있기 때문에 queryKey 또한 Detail 컴포넌트에서 쓴 것과 동일한 키로 무효화시켜줘야 한다. */}
      <CommentList data={data.item.replies} />
    </main>
  );
}
