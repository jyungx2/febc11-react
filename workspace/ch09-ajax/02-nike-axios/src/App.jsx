import { useCallback, useEffect, useState } from "react";
import Product from "./Product";
import Shipping from "./Shipping";
import { DotLoader } from "react-spinners"; // SPINNER
// import axios from "axios";
import useAxiosInstance from "../hooks/useAxiosInstance";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  console.log("App 렌더링"); // 1️⃣

  // fetch API사용해 data 가져오기
  const [data, setData] = useState(); // data = undefined(초기값)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const axios = useAxiosInstance();

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

  // const data = useMemo(
  //   () => ({
  //     _id: 2,
  //     price: 125000,
  //     shippingFees: 3000,
  //     name: "나이키 잼",
  //     quantity: 35,
  //     buyQuantity: 10,
  //     mainImage: "/files/00-nike/NIKE_JAM_01.jpg",
  //     content:
  //       "나이키가 세계적인 무대에 오르는 브레이크 댄서를 위해 제작한 첫 신발인 잼과 함께 몸과 마음, 정신을 하나로 만들어 보세요. 신발의 모든 디테일을 꼼꼼히 제작했기 때문에 자신 있게 사이퍼에 도전할 수 있습니다. 유연하고 내구성이 뛰어난 갑피가 몸을 따라 움직이며, 중창의 텍스처 처리된 핸드 그립 덕분에 공중에서 신발을 쉽게 잡을 수 있습니다. 그리고 위아래가 뒤집힌 로고를 배치해 프리즈 동작을 할 때 로고가 똑바로 보이는 재미를 더했죠.",
  //   }),
  //   []
  // );

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

  const handlePayment = useCallback(() => {
    alert(`배송비 ${shippingFees}원이 추가됩니다. 상품을 결제하시겠습니까?`);
  }, [shippingFees]);

  return (
    <>
      {/* 3️⃣ data = undefined라서 h1만 렌더링 */}
      <h1>01 Nike 상품 상세 조회</h1>
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
            수량:{" "}
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
