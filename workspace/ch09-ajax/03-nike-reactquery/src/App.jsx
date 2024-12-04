import { useCallback, useEffect, useState } from "react";
import Product from "./Product";
import Shipping from "./Shipping";
import { DotLoader } from "react-spinners"; // SPINNER
// import axios from "axios";
import useAxiosInstance from "../hooks/useAxiosInstance";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQuery } from "@tanstack/react-query";

function App() {
  // fetch API사용해 data 가져오기
  // const [data, setData] = useState(); // data = undefined(초기값)
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const axios = useAxiosInstance();

  /*
  // 2️⃣
  const fetchData = async (_id) => {
    // SPINNER
    setIsLoading(true);

    try {
      const res = await axios.get(`/products/${_id}`, {
        params: { delay: 1000 },
      });

      console.log("res", res);
      // const jsonData = await res.json();
      // console.log("jsonData", jsonData);
      setData(res.data.item); // 4️⃣ // 성공하면 setData 호출
      setError(null);

      // // ✅ HTTP 에러 상태 코드 (예: 404, 500): 네트워크 요청이 성공적으로 전송되고 응답이 왔더라도 HTTP 상태 코드가 에러일 경우, catch가 아닌 then이나 try 내부에서 처리가 필요합니다. 이를 위해 res.ok를 활용해 상태를 확인해야 합니다.
      // if (res.ok) {
      //   setData(jsonData.item);
      //   setError(null);
      // } else {
      //   setError(jsonData);
      //   setData(null);
      // }
    } catch (err) {
      // ✅ 네트워크 에러 (예: 인터넷 끊김, 서버 다운): 네트워크 자체가 실패하면 fetch는 catch 블록으로 넘어갑니다.

      // 💫 interceptor가 에러 처리 했으므로 굳이 안해도 괜찮.
      // console.error(err);
      // setError({ message: "잠시 후 다시 요청하세요." }); // 실패하면 setError 호출
      setData(null);
    } finally {
      // SPINNER
      setIsLoading(false);
    }
  };

  // 4️⃣ 마운트가 발생할 때는 컴포넌트가 처음 화면에 그려질 때, 이 과정에서는 아직 실행되지 않고, 마운트가 끝나고, 즉 최초 화면 리렌더링이 끝난 후에 실행되는 게 useEffect.
  // ⭐️⭐️⭐️ API 결과는 매번 리턴값이 다를 수 있다(데이터 정보가 업데이트될 수 있을 가능성 있음) => 순수함수가 아니기 때문에 useEffect로 감싸줘야 한다.

  useEffect(() => {
    fetchData(4);
  }, []);
  // ⭐️⭐️⭐️ 마운트 '된 이후(=되고나서=마운트가 끝나고=최초 화면 렌더링이 끝난후)'에 useEffect훅이 최초로 호출됨..처음에는 data=undefined -> h1만 렌더링되고, 이후에 마운트 될 때, useEffect함수가 호출돼서 data가 업데이트돼서 화면에 데이터가 그제서야 출력된다.
  */

  ////////////////////////////////////////////////////
  ////////////// React Query 사용..
  // => useQuery 훅을 이용해 캐시기능 갖춘 API 호출
  // useQuery를 쓰면 chapter 3에서 커스텀 훅(useFetch, useAxios)에서 상태관리를 직접 해주지 않아도, useQuery가 내부적으로 data, isLoading, error를 상태 관리해준다.

  // 1️⃣ 상품 상세 조회
  const { data, isLoading, error, refetch } = useQuery({
    // 7번 상품
    queryKey: ["product", 7], // 캐시에 사용할 키 값을 지정
    queryFn: () => axios.get(`/products/7`), // Promise를 반환하는 함수 지정(실제로 서버로부터 7번 상품을 조회하는 작업을 여기서 구현) ... Pending - isLoading:true, Resolved - isLoading:false로 속성값이 바뀜, Rejected - error 속성값 발생
    select: (res) => res.data.item, // queryFn의 리턴값을 매개변수(res)로 받아옴으로써, 데이터를 필요한 속성만 딱 꺼내거나 추가하는 식으로 가공..
    // refetchInterval: 1000 * 3;
    // staleTime: 1000 * 3;
  });

  // 2️⃣ 상품 구매
  // 💥💥💥 이걸 handlePayment함수 안에 쓰면 안되니까(리액트에서 훅은 최상위루트에 써야 한다)
  // useMutation을 이용해 이 훅이 반환한 객체에서 특정 속성(Mutate)값으로 해당 훅을 불러오자.💥💥
  // const { data, isLoading, error } = useQuery({
  //   queryFn: () =>
  //     axios.get(`/orders`, {
  //       products: [
  //         {
  //           _id: 1,
  //           quantity: 1,
  //         },
  //         {
  //           _id: 2,
  //           quantity: 2,
  //         },
  //       ],
  //     }),
  // });

  // 2️⃣ - 1️⃣ 상품 구매
  const orderProduct = useMutation({
    // useMutation() 반환한 객체의 mutate() 함수(속성)을 호출하면 mutationFn이 호출됨.
    mutationFn: (products) => axios.post(`/orders`, products),
    // mutationFn 실행이 정상적으로 완료될 경우
    onSuccess: () => {
      toast.success("주문이 완료되었습니다.");
      refetch(); // useQuery() 반환 객체 내의 속성 중 하나.. 새로운 데이터(남은 수량: data.quantity - data.buyQuantity)로 화면 리렌더링
    },
    // mutationFn 실행 중 에러가 발생할 경우
    onError: (err) => {
      toast.error();
      console.log(err);
    },
  });

  console.log("isLoading", isLoading);
  console.log("error", error);
  console.log("data", data);

  const basicShippingFees = 3000;

  const [quantity, setQuantity] = useState(1);
  const [shippingFees, setShippingFees] = useState(basicShippingFees);
  // const productPrice = data.price * quantity;

  // 수량이 변경되면 배송비 다시 계산
  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setShippingFees(basicShippingFees * Math.ceil(newQuantity / 5));
    setQuantity(newQuantity);
  };

  const handlePayment = () => {
    const ok = confirm(
      `배송비 ${shippingFees}원이 추가됩니다. 상품을 결제하시겠습니까?`
    );

    if (ok) {
      // mutateFn() 호출
      orderProduct.mutate({
        products: [{ _id: 7, quantity }],
      });
    }
  };
  // useCallback()에 의해 메모이제이션되어, 수량이 5개까지 갈 때까지 1로 유지가 되므로, 더이상 캐시하는게 의미가 없다 -> useCallback() 벗기자!
  // useCallback() 유지한채 작성하는 방법도 있지만, mutation 넘기는 쪽에서....작성해주는게 일반적??

  return (
    <>
      {/* 3️⃣ data = undefined라서 h1만 렌더링 */}
      <h1>03 Nike 상품 상세 조회 - React Query</h1>
      {/* <Product name={ data.name } price={ data.price } mainImage={ data.mainImage } content={ data.content } /> */}

      {/* 최초 한 번은 data가 존재하지 않기 떄문에 껍데기만 렌더링, 마운트 된 이후에는 fetchData()에 의해 데이터를 받아오기 떄문에 setData실행.. 전체 컴포넌트 렌더링 -> 해당영역 렌더링! */}

      {/* React-spinner 사이트에서 prop 조절해서 스타일링하면 됨. */}
      {isLoading && <DotLoader />}
      {error && <p>{error.message}</p>}

      {data && (
        <div>
          <Product product={data} />

          <h2>수량 선택</h2>
          <div>
            가격: {data.price.toLocaleString()}원<br />
            남은 수량: {data.quantity - data.buyQuantity}
            수량:
            <input
              type="number"
              min="1"
              max={data.quantity - data.buyQuantity}
              value={quantity}
              onChange={handleQuantityChange}
            />
            (배송비는 5개당 {basicShippingFees.toLocaleString()}원씩
            추가됩니다.)
            <br />
            상품 금액: {(data.price * quantity).toLocaleString()}원
          </div>

          <Shipping fees={shippingFees} handlePayment={handlePayment} />
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  );
}

export default App;
