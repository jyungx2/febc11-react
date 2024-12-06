import CommentListItem from "@pages/board/CommentListItem";
import CommentNew from "@pages/board/CommentNew";
import { Link } from "react-router-dom";

export default function CommentList() {
  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8">
        <h4 className="mt-8 mb-4 ml-2">댓글 2개</h4>

        <CommentListItem />

        <CommentNew />
      </section>
    </main>
  );
}
