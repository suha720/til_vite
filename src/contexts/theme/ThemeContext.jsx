import { createContext, useContext, useReducer } from "react";

// 1. 초기값
const initalState = {
  theme: "default",
};

// 2. 리듀서
// 2. reducer 함수
// action : {type : 글자, payload : 전달값}
export function reducer(state, action) {
  switch (action.type) {
    case "BLACK":
      return { ...state, theme: "black" };
    case "GREEN":
      return { ...state, theme: "green" };
    case "BASIC":
      return { ...state, theme: "basic" };
    default:
      return state;
  }
}

// 3. 컨텍스트
const ThemeContext = createContext();

// 4. 프로바이더
export function ThemProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  const value = {
    theme: state.theme,
    blackTheme: () => dispatch({ type: "BLACK" }),
    greenTheme: () => dispatch({ type: "GREEN" }),
    basicTheme: () => dispatch({ type: "BASIC" }),
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
// 5. 커스텀 훅

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("에러");
  }
  return ctx;
}
