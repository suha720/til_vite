import { createContext, useContext, useReducer } from "react";
import { ACTIONS } from "./constants";

// 1. 초기 상태값
const initalState = {
  count: 0,
};
// 2. reducer 함수
// action : {type : 글자, payload : 전달값}
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      // 초기값에 맞게 return 설정 하기
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
// 3. context 생성
const CounterContext = createContext();
// 4. provider 생성
export function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  const value = {
    v: state.count,
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
    reset: () => dispatch({ type: "RESET" }),
    add: a => dispatch({ type: "ADDNUM", payload: a }),
  };
  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}
// 5. custom hook
export function useCounter() {
  const ctx = useContext(CounterContext);
  if (!ctx) {
    throw new Error("에러");
  }
  return ctx;
}
