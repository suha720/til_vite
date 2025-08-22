import { useState } from "react";
import { useTodos } from "../../contexts/todos/useTodos";
import { useNavigate } from "react-router-dom";

const TodoEdit = ({ todo }) => {
  const navigate = useNavigate();
  const { editTodo } = useTodos();
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleEditKeyDown = e => {
    if (e.key === "Enter") {
      handleEditSave();
    }
  };
  const handleEditSave = () => {
    if (editTitle.trim()) {
      // 실제로 todos 의 목록에 업데이트 진행
      editTodo(todo.id, editTitle);
      navigate("/todos");
    }
  };
  const handleEditCancel = () => {
    // 취소했으므로 원본 데이터로 다시 복구
    setEditTitle(todo.title);
    navigate("/todos/");
  };

  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={editTitle}
        onChange={e => setEditTitle(e.target.value)}
        onKeyDown={handleEditKeyDown}
        autoFocus
        className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-neutral-700 dark:bg-neutral-950"
        aria-label="할 일 제목 편집"
      />
      <div className="flex items-center gap-2">
        <button
          onClick={handleEditSave}
          className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
        >
          저장
        </button>
        <button
          onClick={handleEditCancel}
          className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default TodoEdit;
