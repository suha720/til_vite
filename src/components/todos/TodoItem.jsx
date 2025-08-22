import { Link, useNavigate } from "react-router-dom";
import { useTodos } from "../../contexts/todos/useTodos";

const TodoItem = ({ todo }) => {
  // js 자리
  const navigate = useNavigate();
  const { deleteTodo, toggleTodo } = useTodos();

  const handleToggle = () => {
    toggleTodo(todo.id);
  };
  const handleEdit = () => {
    // 편집으로 변경
    navigate(`/todos/${todo.id}/edit`);
  };
  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  // jsx 자리
  return (
    <li className="flex items-center gap-3 rounded-xl border px-3 py-2 transition border-neutral-200 bg-white shadow-sm hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      <>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="h-4 w-4 accent-brand-600"
          aria-label="완료 여부 토글"
        />
        <span
          className={[
            "flex-1 text-sm transition",
            todo.completed
              ? "line-through text-neutral-400"
              : "text-neutral-500 dark:text-neutral-100",
          ].join(" ")}
        >
          <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            삭제
          </button>
        </div>
      </>
    </li>
  );
};

export default TodoItem;
