import PropTypes from "prop-types";
import { Link } from "react-router-dom";

CommentListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CommentListItem({ item }) {
  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <img
          className="w-8 mr-2 rounded-full"
          src="https://api.fesp.shop/files/00-sample/user-muzi.webp"
          alt={`${item.user.name} 프로필 이미지`}
        />
        <Link to="" className="text-orange-400">
          {/* proptypes으로 한번 걸러줬기 때문에 '?'로 굳이 존재유무 검사 안해도 OK */}
          {item.user.name || "익명"}
        </Link>
        <time className="ml-auto text-gray-500" dateTime={`$ {item.createdAt}`}>
          {item.createdAt}
        </time>
      </div>
      <div className="flex justify-between items-center mb-2">
        <form action="#">
          <pre className="whitespace-pre-wrap text-sm">{item.content}</pre>
          <button
            type="submit"
            className="bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          >
            삭제
          </button>
        </form>
      </div>
    </div>
  );
}
