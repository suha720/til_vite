import { useState } from "react";
import { useTodos } from "../../contexts/todos/useTodos";

const TodoWrite = ({ onEndEdit }) => {
  // js 자리
  const { addTodo } = useTodos();

  const [title, setTitle] = useState("");
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSave();
    }
  };
  const handleSave = () => {
    if (title.trim()) {
      //console.log("새로운 할일 추가");
      const newTodo = {
        id: Date.now().toString(),
        title: title,
        completed: false,
      };
      addTodo(newTodo);
      setTitle("");
      onEndEdit();
    }
  };
  // jsx 자리
  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row">
      <div className="relative flex-1">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:border-brand-400 dark:focus:ring-brand-900/40"
          aria-label="할 일 제목 입력"
        />
      </div>
      <button
        onClick={handleSave}
        className="rounded-xl bg-brand-600 px-4 py-4 text-sm font-semibold text-white shadow hover:bg-brand-700 active:scale-[0.99] focus:outline-none focus-visible:right-2 focus-visible:ring-brand-300 dark:hover:bg-brand-500"
      >
        등록
      </button>
    </div>
  );
};

export default TodoWrite;
