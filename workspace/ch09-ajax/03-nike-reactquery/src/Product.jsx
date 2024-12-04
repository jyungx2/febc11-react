import PropTypes from "prop-types";
import { memo } from "react";

const Product = memo(function Product({
  product: { name, price, mainImages, content },
}) {
  // 복잡한 로직
  console.log("Product 렌더링.");

  return (
    <>
      <h2>상품 설명</h2>
      <p>상품명: {name}</p>
      <p>가격: {price.toLocaleString()}원</p>
      <p>상품 설명</p>
      <div>
        {mainImages && (
          // 이미지가 저장된 서버의 URL (강사님이 설정한 서버나 API에서 제공하는 이미지 URL)
          // : 이미지 파일이 서버에 저장되어 있고, 해당 이미지 파일의 경로를 클라이언트에게 전달
          // 가져와지는 이미지들은 이미지 파일 경로와 그에 관련된 메타데이터(예: 이미지 이름, 설명 등)가데이터베이스(DB)**에 저장되어 있어야 한다.
          <img src={`https://11.fesp.shop${mainImages[0].path}`} width="600" />
        )}
        <p>{content}</p>
      </div>
    </>
  );
});

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    mainImages: PropTypes.array,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
