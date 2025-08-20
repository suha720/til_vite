// 2. 리듀서 함수 생성
// action :  { type: 문자열, payload: 값 }
// action.type

import { ACTIONS } from "./constants";

// action.payload
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
