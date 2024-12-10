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
    mutationFn: async (userInfo) => {
      console.log("initial: ", userInfo); // name, email, password 정보가 담긴 객체
      // 이미지 먼저 업로드
      if (userInfo.attach.length > 0) {
        // 이미지 전송을 위한 폼데이터 생성 => JSON문자열이 아니기 때문에, FormData라는 객체를 생성하여 여기다 유저가 추가한 이미지 파일을 담아서 서버에게 보내야한다.
        // 서버는 이 폼데이타를 읽기 위해 content-type: 'multipart'라는 값을 필요로 하기 때문에 아래 headers 부분에 저렇게 보내줘야 한다.
        const imageFormData = new FormData();
        // API 서버가 요구한대로 attach라는 이름으로 업로드할 파일을 body에 넣어 보내야 하기 때문에 'attach'라는 키로 저장한다.
        imageFormData.append("attach", userInfo.attach[0]);

        // post를 붙이면 두번쨰를 바디로, 세번째를 Option으로 인식하므로, (첫번째는 무조건 요청보낼 Url경로) 그냥 axios만 불러줄 것이다.. 세번째에 바디를 넣고 싶다면,,
        const fileRes = await axios("/files", {
          method: "post",
          headers: {
            // **파일 업로드시 필요한 설정**
            // 우리는 더이상 브라우저 > 서버에게 ❌"JSON 형식"의 텍스트를 보낼거야 라고 설정하지 않고❌
            // 여기서 우린 텍스트가 아니라, 파일(binary data)을 전송하려면 content-type에 이런식으로 Multipart라고 해야, 서버가 binary data(문자열로 해석할수 없는, 2진수로 되어있는 형식의 데이터)라고 인식하여 저장가능...
            // 이미 headers속성이 세팅돼 있는 AxiosInstance상에 부르고 있지만, 다음 content-type으로 덮어씌우기!
            "Content-Type": "multipart/form-data",
          },
          // JSON문자열은 그냥 그대로 날것의 formData 객체 형태를 보낼 수 있었지만, 이미지파일과 같은 이진수로 되어있는 Binary file은 data속성으로 보내줘야 한다!
          data: imageFormData,
        });
        // 최종적으로 유저가 등록한 이미지 정보는 image라는 속성 이름으로 저장
        userInfo.image = fileRes.data.item[0];
        // attach는 유저가 입력한 정보로부터 이미지 정보를 빼내기 위해 일시적으로 사용한 키..
        delete userInfo.attach;
      }

      // userInfo: name, email, password 정보가 담긴 객체
      userInfo.type = "user"; // type(user/seller)을 구분해야 에러 메시지 발생 x
      console.log("final: ", userInfo);
      return axios.post(`/users`, userInfo);
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
