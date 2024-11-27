import { current } from "immer";
import PropTypes from "prop-types";
import { Link, useSearchParams } from "react-router-dom";

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  current: PropTypes.number, // 없으면 1로 초기화해주니까 갠춚
};

function Pagination({ totalPages, current = 1 }) {
  // const current = data?.pagination.page; // prop으로 받아올 거라 필요없다.

  let pageList = [];
  const [searchParams] = useSearchParams(); // for문 바깥에 정의

  // pagination 속성은 항상 있기 때문에 굳이 ? 안붙여도 OK
  // 💥💥data는 붙여라!!💥💥
  for (let page = 1; page <= totalPages; page++) {
    searchParams.set("page", page); // page속성을 1.2.3..으로 설정
    let search = searchParams.toString(); // toString: /list?🪝keyword=환승&page=1/2/3🪝 여기서 ?뒤의 문자열을 꺼내옴 (이때, 키워드까지 다같이 뽑아오는 것!)

    pageList.push(
      <li key={page} className={current === page ? "active" : ""}>
        <Link to={`/list?${search}`}>{page}</Link>
      </li>
    );
  }

  return (
    <div className="pagination">
      <ul>{pageList}</ul>
    </div>
  );
}

export default Pagination;
