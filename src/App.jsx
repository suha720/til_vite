import { useEffect, useState } from "react";
import TodoList from "./components/todos/TodoList";
import TodoWrite from "./components/todos/TodoWrite";

// 더미 데이터
const initalTodos = [
  { id: "1", title: "할일1", completed: false },
  { id: "2", title: "할일2", completed: true },
  { id: "3", title: "할일3", completed: true },
  { id: "4", title: "할일4", completed: false },
  { id: "5", title: "할일5", completed: true },
];

function App() {
  // js 자리
  // 1. 할일 목록 상태관리
  const [todos, setTodos] = useState([]);
  // 편집 중인 ID 를 관리함.
  const [editId, setEditId] = useState(null);

  const handleTodoAdd = newTodo => {
    // 현재 최신 state 를 참조
    const arr = [newTodo, ...todos];
    setTodos(arr);

    // 편집 중인 ID 비움
    setEditId(null);
  };
  const handleTodoEdit = (id, title) => {
    const arr = todos.map(item =>
      item.id === id ? { ...item, title: title } : item,
    );
    setTodos(arr);
  };
  const handleTodoDelete = id => {
    const arr = todos.filter(item => item.id !== id);
    setTodos(arr);
  };
  const handleTodoToggle = id => {
    const arr = todos.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );
    setTodos(arr);
  };

  // 2. 실제로 데이터는 DB 에서 비동기로 옮김
  useEffect(() => {
    // 비동기로 진행할 필요 있음.
    setTodos(initalTodos);
  }, []);

  // jsx 자리
  return (
    <div>
      <h1>할일 앱서비스</h1>
      <div>
        <TodoWrite handleTodoAdd={handleTodoAdd}></TodoWrite>
        <TodoList
          todos={todos}
          editId={editId}
          setEditId={setEditId}
          handleTodoEdit={handleTodoEdit}
          handleTodoDelete={handleTodoDelete}
          handleTodoToggle={handleTodoToggle}
        ></TodoList>
      </div>
    </div>
  );
}

export default App;
