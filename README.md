# Context API 와 useReducer

- useState 는 컴포넌트 리랜더링 변수(지역)
- Context 는 앱 리랜더링 변수(전역)

## 1. 기본형 폴더 생성 및 파일 구조

- /src/contexts 폴더 생성
- /src/contexts/TodoContext.jsx

## 2. `Context 가 실무적이지 않은 코드` 구성

- App.jsx

```jsx
import { useState } from "react";
import TodoList from "./components/todos/TodoList";
import TodoWrite from "./components/todos/TodoWrite";
import { TodoProvider } from "./contexts/TodoContext";

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
            onEndEdit={onEndEdit}
            onStartEdit={onStartEdit}
            editId={editId}
          />
        </div>
      </TodoProvider>
    </div>
  );
}

export default App;
```

- TodoWrite.jsx

```jsx
import { useState } from "react";
import { useTodos } from "../../contexts/TodoContext";

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
```

- TodoList.jsx

```jsx
import { useTodos } from "../../contexts/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = ({ onEndEdit, onStartEdit, editId }) => {
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
```

- TodoItem.jsx

```jsx
import { useEffect, useState } from "react";
import { useTodos } from "../../contexts/TodoContext";

const TodoItem = ({ todo, editId, onStartEdit, onEndEdit }) => {
  // js 자리
  const { deleteTodo, toggleTodo, editTodo } = useTodos();
  const [editTitle, setEditTitle] = useState(todo.title);

  // 내가 수정중임을 체크함.
  // const [isEdit, setIsEdit] = useState(false);
  const isEdit = todo.id === editId; // true : 편집, false,null:  편집아님

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
```

- TodoContext.jsx : `실무적이지 않은 코드`

```jsx
import { createContext, useContext, useReducer } from "react";

// 1. 초기값 셋팅
const initialState = {
  todos: [
    { id: "1", title: "할일입니다 1", completed: false },
    { id: "2", title: "할일 2", completed: true },
    { id: "3", title: "할일 3", completed: true },
    { id: "4", title: "할일 4", completed: false },
    { id: "5", title: "할일 5", completed: true },
  ],
};

// 2. 리듀서 함수 생성
// action :  { type: 문자열, payload: 값 }
// action.type
// action.payload
function todosReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { todos: [action.payload, ...state.todos] };
    case "EDIT":
      return {
        todos: state.todos.map(item =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.title }
            : item,
        ),
      };
    case "DELETE":
      return {
        todos: state.todos.filter(item => item.id !== action.payload.id),
      };
    case "TOGGLE":
      return {
        todos: state.todos.map(item =>
          item.id === action.payload.id
            ? { ...item, completed: !item.completed }
            : item,
        ),
      };
    default:
      return state;
  }
}
// 3. 컨텍스트 생성
const TodoContext = createContext();

// 4. 프로바이더 생성
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  // action 실행을 해주는 즉, dispatch 해주는 함수를 미리 만들자.
  // Action 전용 함수 action :  { type: 문자열, payload: 값 }
  const addTodo = todo => dispatch({ type: "ADD", payload: todo });
  const editTodo = (id, title) =>
    dispatch({ type: "EDIT", payload: { id, title } });
  const toggleTodo = id => dispatch({ type: "TOGGLE", payload: { id } });
  const deleteTodo = id => dispatch({ type: "DELETE", payload: { id } });

  // 외부로 노출할 내용 객체
  const value = {
    todos: state.todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
// 5. 커스텀 훅 생성
export function useTodos() {
  return useContext(TodoContext);
}
```

## 3. 실무적인 Context 구성

- 실제 서비스는 상당히 기능이 많고, context 가 많습니다.
- Context 의 내용을 잘게, 잘게 쪼갠 파일 및 폴더로 구성
- contexts/todos 폴더 생성

### 3.1. state 의 초기값 파일

- contexts/todos/initialState.js

```js
export const initialState = {
  todos: [],
};
```

### 3.2. reducer 전용 파일

- contexts/todos/reducer.js 생성

```js
export function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { todos: [action.payload, ...state.todos] };
    case "EDIT":
      return {
        todos: state.todos.map(item =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.title }
            : item,
        ),
      };
    case "DELETE":
      return {
        todos: state.todos.filter(item => item.id !== action.payload.id),
      };
    case "TOGGLE":
      return {
        todos: state.todos.map(item =>
          item.id === action.payload.id
            ? { ...item, completed: !item.completed }
            : item,
        ),
      };
    default:
      return state;
  }
}
```

### 3.3. context 전용 파일

- contexts/todos/context.jsx

```jsx
import { createContext, useReducer } from "react";
import { reducer } from "./reducer";
import { initialState } from "./initialState";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // action 실행을 해주는 즉, dispatch 해주는 함수를 미리 만들자.
  // Action 전용 함수 action :  { type: 문자열, payload: 값 }
  const addTodo = todo => dispatch({ type: "ADD", payload: todo });
  const editTodo = (id, title) =>
    dispatch({ type: "EDIT", payload: { id, title } });
  const toggleTodo = id => dispatch({ type: "TOGGLE", payload: { id } });
  const deleteTodo = id => dispatch({ type: "DELETE", payload: { id } });

  // 외부로 노출할 내용 객체
  const value = {
    todos: state.todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
```

### 3.4. 커스텀 훅 전용 파일

- 관례상 custom hook 들은 /src/hooks 폴더에 둠
- context 를 사용하는 custom hook 은 그냥 contexts/todos 에 둠
- `contexts/todos/useTodos.js` 파일 생성

```js
import { useContext } from "react";
import { TodoContext } from "./context";

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) {
    throw new Error("컨텍스트 생성 안됨, 반드시 Provider 에서 사용하세요. ");
  }
  return ctx;
}
```

## 4. 조금 더 실무적인 Context 구성

- contexts/todos/constants.js

```js
export const ACTIONS = {
  ADD: "ADD",
  DELETE: "DELETE",
  TOGGLE: "TOGGLE",
  EDIT: "EDIT",
};
```

- contexts/todos/reducer.js

```js
import { ACTIONS } from "./constants";

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return { todos: [action.payload, ...state.todos] };
    case ACTIONS.EDIT:
      return {
        todos: state.todos.map(item =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.title }
            : item,
        ),
      };
    case ACTIONS.DELETE:
      return {
        todos: state.todos.filter(item => item.id !== action.payload.id),
      };
    case ACTIONS.TOGGLE:
      return {
        todos: state.todos.map(item =>
          item.id === action.payload.id
            ? { ...item, completed: !item.completed }
            : item,
        ),
      };
    default:
      return state;
  }
}
```

- contexts/todos/actions.js 파일생성

```js
import { ACTIONS } from "./constants";

export const addTodo = todo => ({ type: ACTIONS.ADD, payload: todo });
export const editTodo = (id, title) => ({
  type: ACTIONS.EDIT,
  payload: { id, title },
});
export const toggleTodo = id => ({ type: ACTIONS.TOGGLE, payload: { id } });
export const deleteTodo = id => ({ type: ACTIONS.DELETE, payload: { id } });
```

- contexts/todos/context.jsx

```jsx
import { createContext, useReducer } from "react";
import { reducer } from "./reducer";
import { initialState } from "./initialState";
import { addTodo, deleteTodo, editTodo, toggleTodo } from "./actions";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // action 실행을 해주는 즉, dispatch 해주는 함수를 미리 만들자.
  // Action 전용 함수 action :  { type: 문자열, payload: 값 }
  const actions = {
    add: todo => dispatch(addTodo(todo)),
    edit: (id, title) => dispatch(editTodo(id, title)),
    toggle: id => dispatch(toggleTodo(id)),
    remove: id => dispatch(deleteTodo(id)),
  };

  // 외부로 노출할 내용 객체
  const value = {
    todos: state.todos,
    addTodo: actions.add,
    deleteTodo: actions.remove,
    toggleTodo: actions.toggle,
    editTodo: actions.edit,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
```
