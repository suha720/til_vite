# useState 상태

## 폴더 및 파일 구조

- /src/components 폴더 생성
- /src/components/todos 폴더 생성
- /src/components/todos/TodoWrite.jsx 파일 생성

```jsx
import { useState } from "react";

const TodoWrite = ({ handleTodoAdd }) => {
  // js 자리
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
      handleTodoAdd(newTodo);
      setTitle("");
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
```

- /src/components/todos/TodoList.jsx 파일 생성

```jsx
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
  // js 자리
  // 어느 id 를 편집 중인지 보관
  // const [editId, setEditId] = useState(null);
  // 현재 편집을 시작했는지
  const onEdit = id => {
    console.log("현재 편집 중인 ID : ", id);
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
              // 아래는 true 아니면 false 전달
              isEdit={item.id === editId}
              onEdit={onEdit}
              onCancel={onCancel}
              onSaveEdit={onSaveEdit}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
```

- /src/components/todos/TodoItem.jsx 파일 생성

```jsx
import { useEffect, useState } from "react";

const TodoItem = ({
  todo,
  isEdit, //  true, false
  onEdit,
  onCancel,
  onSaveEdit,
  onDelete,
  onToggle,
}) => {
  // js 자리
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
      //console.log(todo.id, "번이 업데이트됨", editTitle, "으로 변경필요");
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
```

- App.jsx

```jsx
import { useEffect, useState } from "react";
import TodoList from "./components/todos/TodoList";
import TodoWrite from "./components/todos/TodoWrite";

// 더미 데이터
const initialTodos = [
  { id: "1", title: "할일 1", completed: false },
  { id: "2", title: "할일 2", completed: true },
  { id: "3", title: "할일 3", completed: true },
  { id: "4", title: "할일 4", completed: false },
  { id: "5", title: "할일 5", completed: true },
];

function App() {
  // js 자리
  // 1. 할일 목록 상태관리
  const [todos, setTodos] = useState([]);
  // 편집 중인 ID 를 관리함.
  const [editId, setEditId] = useState(null);

  const handleTodoAdd = newTodo => {
    // prev 현재 최신 state 를 참조 업데이트
    // setTodos( prev => [newTodo, ...prev]);

    const arr = [newTodo, ...todos];
    setTodos(arr);

    // 편집중인 ID 비움
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

  // 2. 실제로 데이터는 DB 에서 비동기로 옮
  useEffect(() => {
    // 비동기로 진행할 필요 있음.
    setTodos(initialTodos);
  }, []);

  // jsx 자리
  return (
    <div>
      <h1>할일 앱 서비스</h1>
      <div>
        <TodoWrite handleTodoAdd={handleTodoAdd} />
        <TodoList
          todos={todos}
          editId={editId}
          setEditId={setEditId}
          handleTodoEdit={handleTodoEdit}
          handleTodoDelete={handleTodoDelete}
          handleTodoToggle={handleTodoToggle}
        />
      </div>
    </div>
  );
}

export default App;
```
