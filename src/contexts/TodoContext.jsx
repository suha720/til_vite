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
export const TodoContext = createContext();

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
