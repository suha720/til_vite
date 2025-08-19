import { useEffect, useState } from "react";

const TodoItem = ({
  todo,
  isEdit,
  onEdit,
  onCancel,
  onSaveEdit,
  onDelete,
  onToggle,
}) => {
  // js 자리
  // 1. 현재 수정상태 즉, Edit 인지 아닌지로 구분
  const [editTitle, setEditTitle] = useState(todo.title);


  // isEdit 이 true 이면 계속 업데이트
  // isEdit 이 true 이면 todo.title 을 계속 업데이트
  useEffect(() => {
    if (isEdit) {
      setEditTitle(todo.title);
    }
  }, [isEdit, todo.title]);

  const handleToggle = () => {
    // console.log(todo.id, "번의 complted 가 변경됨");
    onToggle(todo.id);
  };
  const handleEdit = () => {
    onEdit(todo.id);
  };
  const handleDelete = () => {
    // console.log(todo.id, "번이 삭제됨");
    onDelete(todo.id);
  };
  const handleEditKeyDown = e => {
    if (e.key === "Enter") {
      handleEditSave();
    }
  };
  const handleEditSave = () => {
    if (editTitle.trim()) {
      // 실제로 todos 의 목록에 업데이트 진행
      //   console.log(todo.id, "번이 업데이트됨", editTitle, "으로 변경필요");
      onSaveEdit(todo.id, editTitle);
    }
  };
  const handleEditCancel = () => {
    // 취소했으므로 원본 데이터로 다시 복구
    setEditTitle(todo.title);
    onCancel();
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
