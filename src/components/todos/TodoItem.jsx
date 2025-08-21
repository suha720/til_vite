import { useEffect, useRef, useState } from "react";
import { useTodos } from "../../contexts/todos/useTodos";

const TodoItem = ({ todo, editId, onStartEdit, onEndEdit }) => {
  // js 자리
  const { deleteTodo, toggleTodo, editTodo } = useTodos();
  const [editTitle, setEditTitle] = useState(todo.title);

  // 내가 수정중임을 체크함.
  // const [isEdit, setIsEdit] = useState(false);
  const isEdit = todo.id === editId; // true : 편집, false,null:  편집아님

  // 태그 참조
  const inputRef = useRef(null);
  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
      // 커서를 글자에 마지막으로 보내기
      const element = inputRef.current;
      const len = element.value.length;
      try {
        element.setSelectionRange(len, len);
      } catch {
        console.log("에러에요");
      }
    }
  }, [isEdit]);

  // isEdit 이 true 이면 계속 업데이트
  // isEdit 이 true 이면 todo.title 을 계속 업데이트
  useEffect(() => {
    if (isEdit) {
      setEditTitle(todo.title);
    }
  }, [isEdit, todo.title]);

  const handleToggle = () => {
    toggleTodo(todo.id);
  };
  const handleEdit = () => {
    // 편집으로 변경
    onStartEdit(todo.id);
  };
  const handleDelete = () => {
    deleteTodo(todo.id);
    onEndEdit();
  };
  const handleEditKeyDown = e => {
    if (e.key === "Enter") {
      handleEditSave();
    }
  };
  const handleEditSave = () => {
    if (editTitle.trim()) {
      // 실제로 todos 의 목록에 업데이트 진행
      editTodo(todo.id, editTitle);
      onEndEdit();
    }
  };
  const handleEditCancel = () => {
    // 취소했으므로 원본 데이터로 다시 복구
    setEditTitle(todo.title);
    onEndEdit();
  };

  // jsx 자리
  return (
    <li className="flex items-center gap-3 rounded-xl border px-3 py-2 transition border-neutral-200 bg-white shadow-sm hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      {isEdit ? (
        <>
          <input
            ref={inputRef}
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
        </>
      ) : (
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
            {todo.title}
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
      )}
    </li>
  );
};

export default TodoItem;
