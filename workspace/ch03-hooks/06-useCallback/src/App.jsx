import { useCallback, useMemo, useState } from "react";
import Product from "./Product";
import Shipping from "./Shipping";
import Product2 from "./Product2";

function App() {
  // 🖍️Product2 문제해결🖍️
  // product prop에 해당하는 data 값을 리턴해주는 함수를 만들고, 이 함수를 메모이제이션하는 useMemo()를 사용하면, 매번 캐시된 값을 반환하여 수량이 변경되어도 불필요하게 리렌더링 되지 않는다!
  // useMemo: 함수를 인자로 전달하고, 전달된 함수의 실행 결과(리턴값)를 memoize 함
  // 헷갈리지말자, useMemo는 함수가 아니라, 함수의 "리턴값"을 메모이제이션하는 것..
  // 따라서, 리렌더링 될 때마다 새롭게 생성되는 객체타입의 데이터를 몽땅 useMemo()로 메모이제이션하면 된다!!!
  // 함수를 메모이제이션하는 것은 useCallback!! = 보통, prop자체가 함수일 경우 사용
  // 컴포넌트를 메모이제이션하는 것은 memo!!
  const data = useMemo(
    () => ({
      _id: 2,
      price: 125000,
      shippingFees: 3000,
      name: "나이키 잼",
      quantity: 35,
      buyQuantity: 10,
      mainImage: "/files/00-nike/NIKE_JAM_01.jpg",
      content:
        "나이키가 세계적인 무대에 오르는 브레이크 댄서를 위해 제작한 첫 신발인 잼과 함께 몸과 마음, 정신을 하나로 만들어 보세요. 신발의 모든 디테일을 꼼꼼히 제작했기 때문에 자신 있게 사이퍼에 도전할 수 있습니다. 유연하고 내구성이 뛰어난 갑피가 몸을 따라 움직이며, 중창의 텍스처 처리된 핸드 그립 덕분에 공중에서 신발을 쉽게 잡을 수 있습니다. 그리고 위아래가 뒤집힌 로고를 배치해 프리즈 동작을 할 때 로고가 똑바로 보이는 재미를 더했죠.",
    }),
    []
  );

  const [quantity, setQuantity] = useState(1);
  const [shippingFees, setShippingFees] = useState(data.shippingFees);
  // (물건 가격) * (수량)
  const productPrice = data.price * quantity;

  // 수량이 변경되면 배송비 다시 계산
  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value); // 인풋값은 항상 string으로 넘어온다
    setQuantity(newQuantity);
    setShippingFees(data.shippingFees * Math.ceil(newQuantity / 5));
  };

  // Shipping component
  // 👉 fee : number type() -> 수량이 5단위로 넘어가지 않는 이상(=> 화면 리렌더링 필수), 값은 동일하므로 수량 바뀔 때마다 render❌
  // 👉 handlePayment : func type(참조형) -> 앱 리렌더링 시, 이 함수자체는 바뀐 값(state system X)이 없음에도 불구하고, 참조형 데이터는 힙에 매번 새로운 객체로 만들어지므로, 다른 데이터라고 판단해, 수량 바뀔 때마다 render됨 => 매우 불필요한 성능을 저해하는 작업!
  // 이때, handlePayment()함수만 메모이제이션하여 굳이 리렌더링 될 필요없도록 만들고 싶다면!
  // -> 함수를 메모이제이션하는 훅인 useCallback()을 써주면 된다..

  // cf-1) useMemo(): 함수를 인자로 전달하고, 전달된 함수의 리턴값(실행결과)을 메모라이즈함.
  // ex) 05-useMemo/isPrime()
  // cf-2) React.memo(): 컴포넌트 자체를 인자로 전달하고, 전달된 컴포넌트를 메모라이즈함.
  // ex) const Product = memo(function Product({ name, price, mainImage, content }) {
  const handlePayment = useCallback(() => {
    alert(`배송비 ${shippingFees}원이 추가됩니다. 상품을 결제하시겠습니까?`);
  }, [shippingFees]);
  // 함수 안에 함수가 있고, 그 함수 내부에 지역변수를 참조하고 있다 -> "Closure"
  // useCallback()으로 인해 해당 함수가 메모이제이션되어 최초로 마운트 됐을 당시에 캐시되어있던 데이터(data.shippingfees = 3000)를 불러오기 때문에 수량을 변경해 배송비가 변경됐을 때도 3000이 나오는 것! => dependencies에 shippingfees를 넣어주어 해당 값이 바뀌면 메모이제이션된 캐시된 데이터를 쓰는게 아닌, 새롭게 호출하여 변경된 shippingfees(= state value)가 들어가게끔 해준다!

  return (
    <>
      <h1>
        06 useCallback(함수 자체를 memoize), React.memo(컴포넌트를 memoize)
      </h1>
      <Product2 product={data} />

      {/* Product */}
      <Product
        name={data.name}
        price={data.price}
        mainImage={data.mainImage}
        content={data.content}
      />

      <h2>수량 선택</h2>
      <div>
        가격: {data.price.toLocaleString()}원
        <br />
        수량:
        {/* 제어 컴포넌트로 만든다 = state 시스템으로 관리한다. => 값이 변경됐을 때, 화면도 같이 변경되어야 할 때.. */}
        <input
          type="number"
          min="1"
          max={data.quantity - data.buyQuantity}
          value={quantity}
          onChange={handleQuantityChange}
        />
        (배송비는 5개당 {data.shippingFees.toLocaleString()}원씩 추가됩니다.)
        <br />
        상품 금액: {productPrice.toLocaleString()}원
      </div>

      {/* Shipping */}
      <Shipping fees={shippingFees} handlePayment={handlePayment} />
    </>
  );
}

export default App;
