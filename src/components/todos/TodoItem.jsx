import { useEffect, useState } from "react";
import { useTodos } from "../../contexts/todos/useTodos";

const TodoItem = ({ todo, editId, onStartEdit, onEndEdit }) => {
  // js 자리
  const { deleteTodo, toggleTodo, editTodo } = useTodos();
  const [editTitle, setEditTitle] = useState(todo.title);
  // 내가 수정중임을 체크함.
  // const [isEdit, setIsEdit] = useState(false);
  const isEdit = todo.id === editId; // true : 편집, false,null : 편집안함
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

  const liStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: todo.completed ? "gray" : "red",
  };
  const titleStyle = {
    textDecoration: todo.completed ? "line-through" : "none",
  };

  // jsx 자리
  return (
    <li style={liStyle}>
      {isEdit ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyDown={handleEditKeyDown}
          />
          <button onClick={handleEditSave}>저장</button>
          <button onClick={handleEditCancel}>취소</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
          />
          <span style={titleStyle}>{todo.title}</span>
          <button onClick={handleEdit}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
