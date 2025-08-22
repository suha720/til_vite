import { useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../contexts/todos/useTodos";
import { useEffect, useState } from "react";

const TodoReadPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { findTodo } = useTodos();
  const [todo, setTodo] = useState(null);
  useEffect(() => {
    if (id) {
      const result = findTodo(id);
      setTodo(result);
    }
  }, [id]);

  if (!todo) {
    return <div>잘못된 아이디입니다.</div>;
  }

  return (
    <div>
      <h2>상세보기</h2>
      <div className="flex items-center gap-3 rounded-xl border px-3 py-2 transition border-neutral-200 bg-white shadow-sm hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
        <span
          className={[
            "flex-1 text-sm transition",
            todo.completed
              ? "line-through text-neutral-400"
              : "text-neutral-500 dark:text-neutral-100",
          ].join(" ")}
        >
          {todo.title}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/todos/${todo.id}/edit`)}
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            수정
          </button>
          <button
            onClick={() => navigate(`/todos`)}
            className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            목록
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default TodoReadPage;
