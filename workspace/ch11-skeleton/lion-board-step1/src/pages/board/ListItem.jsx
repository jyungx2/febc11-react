import PropTypes from "prop-types";
import { Link } from "react-router-dom";

ListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({ name: PropTypes.string.isRequired }),
    views: PropTypes.number.isRequired,
    repliesCount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};

export default function ListItem({ item }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
      <td className="p-2 text-center">{item._id}</td>
      <td className="p-2 truncate indent-4">
        {/* 절대적인 경로: {`/${item.type}/${item._id}`}로 쓰기보다, 이미 연결한 type뒤에 id만 붙도록 아래와 같이 상대경로로 설정. */}
        <Link to={`${item._id}`} className="cursor-pointer">
          {item.title}
        </Link>
      </td>
      <td className="p-2 text-center truncate">{item.user.name}</td>
      <td className="p-2 text-center hidden sm:table-cell">{item.views}</td>
      <td className="p-2 text-center hidden sm:table-cell">
        {item.repliesCount}
      </td>
      <td className="p-2 truncate text-center hidden sm:table-cell">
        {item.createdAt}
      </td>
    </tr>
  );
}
