import useAxiosInstance from "@hooks/useAxiosInstance";
import CommentListItem from "@pages/board/CommentListItem";
import CommentNew from "@pages/board/CommentNew";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function CommentList() {
  const axios = useAxiosInstance();

  // /:type
  // localhost/info => useParams()의 리턴값 { type: info }
  const { type, _id } = useParams();
  const { data } = useQuery({
    queryKey: ["posts", _id, "replies", type],
    queryFn: () => axios.get(`/posts/${_id}/replies`, { params: { type } }),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });
  console.log(data);

  if (!data) {
    return <div>로딩중...</div>;
  }

  const list = data.item.map((item) => (
    <CommentListItem key={item._id} item={item} />
  ));

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 2개</h4>
      {list}
      <CommentNew />
    </section>
  );
}
