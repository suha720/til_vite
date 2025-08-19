import { useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  editId,
  setEditId,
  handleTodoEdit,
  handleTodoDelete,
  handleTodoToggle,
}) => {
  // js
  // 어느 id를 편집 중인지 보관
//   const [editId, setEditId] = useState(null);
  // 현재 편집을 시작했는지
  const onEdit = id => {
    console.log("현재 편집 중이 ID : ", id);
    setEditId(id);
  };
  // 현재 편집을 취소했는지
  const onCancel = () => {
    setEditId(null);
  };
  // 현재 편집을 완료하고 저장했는지
  const onSaveEdit = (id, newTitle) => {
    handleTodoEdit(id, newTitle);
    setEditId(null);
  };

  // 누가 toggle 했는지 처리
  const onToggle = id => {
    handleTodoToggle(id);
    if (editId === id) {
      setEditId(null);
    }
  };

  // 삭제 했을 때
  const onDelete = id => {
    handleTodoDelete(id);
    if (editId === id) {
      setEditId(null);
    }
  };

  // jsx
  return (
    <div>
      <h2>할일 목록</h2>
      <div>
        <ul>
          {todos.map(item => (
            <TodoItem
              key={item.id}
              todo={item}
              isEdit={item.id === editId}
              onEdit={onEdit}
              onCancel={onCancel}
              onSaveEdit={onSaveEdit}
              onDelete={onDelete}
              onToggle={onToggle}
            ></TodoItem>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
