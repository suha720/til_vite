import { useState } from "react";
import TodoList from "./components/todos/TodoList";
import TodoWrite from "./components/todos/TodoWrite";
import { TodoProvider } from "./contexts/todos/context";

function App() {
  // js 자리
  // 오로지 하나만 편집이 가능하도록 ID 를 저장해둠
  const [editId, setEditId] = useState(null);
  // 편집을 시작했다.
  const onStartEdit = id => {
    setEditId(id);
  };
  // 편집을 종료했다.
  const onEndEdit = () => {
    setEditId(null);
  };
  // jsx 자리
  return (
    <div>
      <h1>할일 앱 서비스</h1>
      <TodoProvider>
        <div>
          <TodoWrite onEndEdit={onEndEdit} />
          <TodoList
            editId={editId}
            onStartEdit={onStartEdit}
            onEndEdit={onEndEdit}
          />
        </div>
      </TodoProvider>
    </div>
  );
}

export default App;
