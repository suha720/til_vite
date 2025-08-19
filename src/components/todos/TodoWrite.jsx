import { useState } from "react";

const TodoWrite = ({ handleTodoAdd }) => {
  // js
  const [title, setTitle] = useState("");
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      if (title.trim()) {
        handleSave();
      }
    }
  };

  const handleSave = () => {
    if (title.trim()) {
      console.log("새로운 것기능 테스트");
      const newTodo = {
        id: Date.now().toString(),
        title: title,
        completed: false,
      };
      handleTodoAdd(newTodo);
      setTitle("");
    }
  };

  // jsx
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
