import { ACTIONS } from "./constants";

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTIONS.RESET:
      return { ...state, count: 0 };
    case ACTIONS.ADDNUM:
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
}
