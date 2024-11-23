import PropTypes from "prop-types";

function TodoItem({ item, toggleDone, deleteItem }) {
  return (
    <li>
      <span>{item._id}</span>
      <span onClick={() => toggleDone(item._id)}>
        {item.done ? <s>{item.title}</s> : item.title}
      </span>
      <button type="button" onClick={() => deleteItem(item._id)}>
        삭제
      </button>
    </li>
  );
}

// 🖍️propTypes (소문자, 속성명) - PropTypes (대문자, 라이브러리명)
// TodoItem의 proptype이라는 속성을 정의하겠다!
TodoItem.propTypes = {
  // item: PropTypes.object.isRequired,
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool, // 굳이 없어도 된다(필수x)
  }),
  toggleDone: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default TodoItem;
