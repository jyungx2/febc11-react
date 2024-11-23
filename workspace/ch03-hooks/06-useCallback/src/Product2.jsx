import PropTypes from "prop-types";
import { memo } from "react";

const Product2 = memo(function Product({
  product: { name, price, mainImage, content },
}) {
  // function Product({ name, price, mainImage, content }) {
  console.log("복잡한 로직");
  // ⬆️ 기존 prop들을 product: {}으로 한번 더 감싸주고, prop을 전달하게 되면, prop들은 참조형 타입인 객체로 한번 더 묶여서 전달되어 새로운 주소를 가진 값으로 리액트에게 인식된다 => 화면 리렌더링시마다 불필요하게 리렌더링되는 결과 발생 => 어떻게 고칠까?

  // 💥 수량 변경 - 화면 리렌더링(위 컨솔 출력) - Product2가 메모이제이션 안 되고 계속 호출된다는 얘기..  (계속 호출된다는 것은 props가 새롭게 만들어진다는 소리)
  return (
    <>
      <h2>상품 설명</h2>
      <p>상품명: {name}</p>
      <p>가격: {price.toLocaleString()}</p>
      <p>상품 설명</p>
      <div>
        <img src={`https://11.fesp.shop${mainImage}`} width="600" />
        <p>{content}</p>
      </div>
    </>
  );
  // }
});

Product2.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    mainImage: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product2;
