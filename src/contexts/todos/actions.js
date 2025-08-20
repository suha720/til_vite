import { ACTIONS } from "./constants";

export const addTodo = todo => ({ type: ACTIONS.ADD, payload: todo });
export const editTodo = (id, title) =>
  ({ type: ACTIONS.EDIT, payload: { id, title } });
export const toggleTodo = id => ({ type: ACTIONS.TOGGLE, payload: { id } });
export const deleteTodo = id => ({ type: ACTIONS.DELETE, payload: { id } });
