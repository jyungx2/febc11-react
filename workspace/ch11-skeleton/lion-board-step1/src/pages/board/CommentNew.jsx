import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function CommentNew() {
  // ✅ useNavigate() 훅 사용해 페이지 이동!
  const navigate = useNavigate();
  const axios = useAxiosInstance();

  const queryClient = useQueryClient();
  const { type, _id } = useParams();
  // const [content, setContent] = useState(""); // 댓글 내용
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addComment = useMutation({
    mutationFn: (formData) => {
      // ✅ 사용자가 입력한 값(input요소에서 받아온 값) + type 속성까지 더해서 서버로 등록요청 보내야 한다.
      return axios.post(`/posts/${_id}/replies`, formData);
    },
    onSuccess: () => {
      // 댓글 추가가 성공하면 댓글 목록을 다시 가져오기 위해 refetch
      queryClient.invalidateQueries({
        queryKey: ["posts", _id],
      }); // 89번 글의 댓글을 무효화 => commentList에서 queryKey에 썼던 것을 써야 함....똑같이 써야하나?? YES.

      // 현재 페이지 pathname === /:type/:_id 에서 다시 "업데이트된" 현재 페이지로
      navigate(`/${type}/${_id}`); // "절대경로" - 앞에 슬래시 하나 붙여서 목록 페이지로 이동하도록..
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={handleSubmit(addComment.mutate)}>
        <div className="mb-4">
          <textarea
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            // name="comment"
            {...register("content", { required: "내용은 필수입니다." })}
            // value={content}
            // onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <InputError target={errors.content} />
        </div>
        <button
          type="submit"
          className="bg-orange-500 py-1 px-4 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
        >
          댓글 등록
        </button>
      </form>
    </div>
  );
}
