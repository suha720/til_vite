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
    <div>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSave}>등록</button>
    </div>
  );
};

export default TodoWrite;
