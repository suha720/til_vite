import { useTodos } from "../../contexts/todos/useTodos";
import TodoItem from "./TodoItem";

const TodoList = ({ editId, onStartEdit, onEndEdit }) => {
  // js 자리
  const { todos } = useTodos();

  // jsx 자리
  return (
    <div>
      <h2>할일 목록</h2>
      <div>
        <ul>
          {todos.map(item => (
            <TodoItem
              key={item.id}
              todo={item}
              // 하나만 편집이 가능하도록 구성
              editId={editId}
              onStartEdit={onStartEdit}
              onEndEdit={onEndEdit}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
