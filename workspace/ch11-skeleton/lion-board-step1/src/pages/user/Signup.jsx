import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  // ✅ useNavigate() 훅 사용해 페이지 이동!
  const navigate = useNavigate();

  // ✅ useState 대신, useForm 훅을 이용한 인풋 데이터 처리
  // 다음 register, handleSubmit, formState속성은 필수값!
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const axios = useAxiosInstance();

  const addUser = useMutation({
    mutationFn: (formData) => {
      // ✅ 사용자가 입력한 값(input요소에서 받아온 값) + type 속성까지 더해서 서버로 등록요청 보내야 한다.
      // 아래처럼 body라는 새로운객체를 직접 생성해 formData대신 넘겨줘도 오케이.. 근데 굳이 그럴 필욘 없지.
      // const body = {
      //   name: formData.name,
      //   email: formData.email,
      //   password: formData.password,
      // };
      formData.type = "user"; // type을 구분해야 에러 메시지 발생 x (user - 구매자 / seller - 판매자) .. 하드코딩해도 ㄱㅊ
      return axios.post(`/users`, formData);
    },
    onSuccess: () => {
      alert("회원가입 완료");
      navigate(`/`); // 회원가입 끝나면 메인 페이지로 이동해라.
    },
    onError: (err) => {
      console.error(err);

      // 📩 에러메시지 출력
      // 특정 인풋요소의 유효성 실패 || 일반적인 오류('잘못된 값이 있습니다') || 잠시후 다시 요청하세요(서버 또는 네트워크 오류)
      // => 이렇게 alert로 단순하게 에러를 알려주는 것보다, 입력 필드 바로 아래에 나타내주는 것이 UX친화적!! => useForm의 'setError' 속성 사용
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error) =>
          // setError함수를 이용해 에러 객체를 만들어서 입력 필드 바로 아래에 오류 메시지가 뜨도록.. (key, value를 각각 이런 식으로 설정)
          setError(error.path, { message: error.msg })
        );
      } else {
        alert(
          err.response?.data.errors?.[0].msg ||
            err.response?.data.message ||
            "잠시 후 다시 요청하세요."
        );
      }
    },
  });

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원 가입
          </h2>
        </div>

        <form onSubmit={handleSubmit(addUser.mutate)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              // name="name"
              {...register("name", { required: "이름을 필수입니다." })}
            />
            <InputError target={errors.name} />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              // name="email"
              {...register("email", { required: "이메일은 필수입니다." })}
            />
            <InputError target={errors.email} />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              // name="password"
              {...register("password", { required: "비밀번호는 필수입니다." })}
            />
            <InputError target={errors.password} />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="attach"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              id="attach"
              accept="image/*"
              placeholder="이미지를 선택하세요"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              // name="attach"
              {...register("attach")}
            />
          </div>

          <div className="mt-10 flex justify-center items-center">
            <button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              회원가입
            </button>
            <a
              href="/"
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              취소
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
