import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // zustand이 관리하고 있는 store으로부터 상태값을 변경하는 setUser함수만 가져옴
  // const { setUser } = useUserState();
  // const setUser = useUserStore((store) => store.setUser);

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

  const login = useMutation({
    mutationFn: (formData) => axios.post(`/users/login`, formData),
    onSuccess: (res) => {
      console.log(res);

      // // 회원정보 저장
      // const user = res.data.item;
      // // 받아온 응답으로부터 data.item으로 접근하여 내가 필요한 만큼
      // // 뽑아와서 적절한 키 네임으로 setUser로 user 상태값을 저장하면 된다.
      // // 현재 이 컴포넌트에서 user 상태는 직접적으로 사용하진 않지만, store가 자동으로 구독이 되기 때문에 user상태 변경시(setUser만 호출해도) 리렌더링 발생!
      // setUser({
      //   _id: user._id,
      //   name: user.name,
      //   profile: user.image?.path,
      //   accessToken: user.token.accessToken,
      //   refreshToken: user.token.refreshToken,
      // });

      alert(res.data.item.name + "님, 로그인 되었습니다.");
      navigate(`/`); // 회원가입 끝나면 메인 페이지로 이동해라.
    },
    onError: (err) => {
      console.error(err);

      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error) =>
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
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            로그인
          </h2>
        </div>

        <form onSubmit={handleSubmit(login.mutate)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              // name="email"
              {...register("email", { required: "이메일은 필수입니다." })}
            />
            <InputError target={errors.email} />
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              이메일은 필수입니다.
            </p> */}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              // name="password"
              {...register("password", { required: "비밀번호는 필수입니다." })}
            />
            <InputError target={errors.password} />
            <a
              href="#"
              className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </a>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              로그인
            </button>
            <a
              href="/users/signup"
              className="ml-8 text-gray-800 hover:underline"
            >
              회원가입
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
