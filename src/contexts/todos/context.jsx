import { createContext, useReducer } from "react";
import { reducer } from "./reducer";
import { initialState } from "./initialState";
import { addTodo, deleteTodo, editTodo, toggleTodo } from "./actions";

// 3. 컨텍스트 생성
export const TodoContext = createContext();

// 4. 프로바이더 생성
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // action 실행을 해주는 즉, dispatch 해주는 함수를 미리 만들자.
  // Action 전용 함수 action :  { type: 문자열, payload: 값 }
  const actions = {
    add: todo => dispatch(addTodo(todo)),
    edit: (id, title) => dispatch(editTodo(id, title)),
    toggle: id => dispatch(toggleTodo(id)),
    remove: id => dispatch(deleteTodo(id)),
    find: id => state.todos.find(item => item.id === id), // state 업데이트 x
  };

  // 외부로 노출할 내용 객체
  const value = {
    todos: state.todos,
    addTodo: actions.add,
    deleteTodo: actions.remove,
    toggleTodo: actions.toggle,
    editTodo: actions.edit,
    findTodo: actions.find,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
