import PropTypes from "prop-types";
import { memo } from "react";

// 👀 선언식 -> 표현식으로 바꼈으므로 propTypes 코드를 밑으로 보내야 한다
// 🚨 표현식은 호이스팅 불가 ... 다음 코드가 undefined된 상태에서 불러와짐 -> 에러
// 🖍️ React.memo(): 대표적인 고차함수 -> 매개변수에 들어간 함수를 메모이제이션화하여 반환
const Product = memo(function Product({ name, price, mainImage, content }) {
  // function Product({ name, price, mainImage, content }) {
  // console.log("복잡한 로직");

  // ⬆️ memo()함수로 씌워주면, 위의 컨솔이 한번만 출력되는 것을 알 수 있다.
  // 실제로 이 product 컴포넌트가 다시 호출되는 게 아니라, 메모이제이션된 것을 가져다 쓴다는 증거..

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

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  mainImage: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Product;
