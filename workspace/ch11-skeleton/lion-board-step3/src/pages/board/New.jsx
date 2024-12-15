import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputError from "@components/InputError";
import { Helmet } from "react-helmet-async";

export default function New() {
  // ✅ useNavigate() 훅 사용해 페이지 이동!
  const navigate = useNavigate();

  // ✅ useState 대신, useForm 훅을 이용한 인풋 데이터 처리
  // 다음 register, handleSubmit, formState속성은 필수값!
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axios = useAxiosInstance();
  // List.jsx에 있는 useQuery부분 복사해옴 + _id 파라미터만 추가
  const { type } = useParams();

  const queryClient = useQueryClient();

  const addItem = useMutation({
    mutationFn: (formData) => {
      // ✅ 사용자가 입력한 값(input요소에서 받아온 값) + type 속성까지 더해서 서버로 등록요청 보내야 한다.
      formData.type = type;
      return axios.post(`/posts`, formData);
    },
    onSuccess: () => {
      alert("게시물이 등록되었습니다.");
      // navigate(-1); // 한 페이지 뒤로 이동.
      // 현재 페이지 pathname: /free/new
      queryClient.invalidateQueries({ queryKey: ["posts", type] });
      navigate(`/${type}`); // "절대경로" - 앞에 슬래시 하나 붙여서 목록 페이지로 이동하도록..
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <>
      <Helmet>
        <title>게시글 작성 - 멋사컴</title>
        <meta property="og:title" content="게시글 작성 - 멋사컴"></meta>
        <meta
          property="og:description"
          content="새로운 게시글을 작성해보세요. 멋사컴에서 다양한 의견과 정보를 공유할 수 있습니다."
        />
      </Helmet>

      <main className="min-w-[320px] p-4">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            게시글 등록
          </h2>
        </div>
        <section className="mb-8 p-4">
          {/* ~.mutate: addItem함수(~)로부터 리턴받은 mutationFn을 호출해라 */}
          <form onSubmit={handleSubmit(addItem.mutate)}>
            <div className="my-4">
              <label className="block text-lg content-center" htmlFor="title">
                제목
              </label>
              <input
                id="title"
                type="text"
                placeholder="제목을 입력하세요."
                className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                // name="title"
                {...register("title", { required: "제목은 필수입니다." })}
              />
              {/* 🚧 2번 이상 사용되는 코드는 재사용성위해 컴포넌트화!! */}
              {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {errors.title?.message}
            </p> */}
              <InputError target={errors.title} />
            </div>
            <div className="my-4">
              <label className="block text-lg content-center" htmlFor="content">
                내용
              </label>
              <textarea
                id="content"
                rows="15"
                placeholder="내용을 입력하세요."
                className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                // name="content"
                {...register("content", { required: "내용은 필수입니다." })}
              ></textarea>
              {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {errors.content?.message}
            </p> */}
              <InputError target={errors.content} />
            </div>
            <hr />
            <div className="flex justify-end my-6">
              <button
                type="submit"
                className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              >
                등록
              </button>
              <Link
                to="/info"
                className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              >
                취소
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
