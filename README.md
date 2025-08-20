# 카운터 예제 (Context API / useReducer)

## 1. 기본셋팅

- App.jsx

```jsx
function App() {
  return <div>App</div>;
}

export default App;
```

## 2. `CouterContext` 를 생성 및 관리

- /src/contexts/`counter` 폴더
- 예) /src/contexts/`theme` 폴더 생성
- 예) /src/contexts/`user` 폴더 생성
- 예) /src/contexts/`bucket` 폴더 생성

## 3. CouterContext.jsx 파일 생성

- /src/contexts/counter/CounterContext.jsx

```jsx
import { createContext, useContext, useReducer } from "react";

// 1. 초기 상태값
const initialState = {
  count: 0,
};
// 2. 리듀서 함수
// action : {type:글자, payload: 전달값}
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    case "ADDNUM":
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
}
// 3. 컨텍스트 생성
const CounterContext = createContext();
// 4. 프로바이더 생성
export function ConunterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    v: state.count,
    increment: () => dispatch({ type: "INCRMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
    reset: () => dispatch({ type: "RESET" }),
    add: a => dispatch({ type: "ADDNUM", payload: a }),
  };

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}
// 5. 커스텀 훅
export function useCounter() {
  const ctx = useContext(CounterContext);
  return ctx;
}
```

- App.jsx

```jsx
import {
  ConunterProvider,
  useCounter,
} from "./contexts/counter/CounterContext";

const CounterComponent = () => {
  const { v, add } = useCounter();

  return (
    <div>
      {v}카운터지요 <button onClick={() => add(5)}>5 증가</button>
    </div>
  );
};

function App() {
  return (
    <ConunterProvider>
      <CounterComponent />
    </ConunterProvider>
  );
}

export default App;
```

## 4. 파일 분리

- /src/components/counter/initialState.js

```js
export const initialState = {
  count: 0,
};
```

- /src/components/counter/constants.js

```js
export const ACTIONS = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  RESET: "RESET",
  ADDNUM: "ADDNUM",
};
```

- /src/components/counter/reducer.js

```js
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
```

- /src/components/counter/actions.js

```js
import { ACTIONS } from "./constants";

export const incrmentAction = () => ({ type: ACTIONS.INCREMENT });
export const decrmentAction = () => ({ type: ACTIONS.DECREMENT });
export const resetAction = () => ({ type: ACTIONS.RESET });
export const addNumAction = a => ({ type: ACTIONS.ADDNUM, payload: a });
```

- /src/components/counter/context.jsx

```jsx
import { createContext, useReducer } from "react";
import {
  addNumAction,
  decrmentAction,
  incrmentAction,
  resetAction,
} from "./actions";
import { initialState } from "./initialState";
import { reducer } from "./reducer";

// 1. 컨텍스트 생성
export const CounterContext = createContext();
// 2. 프로바이더 생성
export function ConunterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    v: state.count,
    incrment: () => dispatch(incrmentAction()),
    decement: () => dispatch(decrmentAction()),
    reset: () => dispatch(resetAction()),
    add: a => dispatch(addNumAction(a)),
  };
  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}
```

- /src/components/counter/useCounter.js

```js
import { useContext } from "react";
import { CounterContext } from "./context";

export function useCounter() {
  const ctx = useContext(CounterContext);
  if (!ctx) {
    throw new Error("에러입니다.");
  }
  return ctx;
}
```

- App.jsx

```jsx
import { ConunterProvider } from "./contexts/counter/context";
import { useCounter } from "./contexts/counter/useCounter";

const CounterComponent = () => {
  const { v, add } = useCounter();

  return (
    <div>
      {v}카운터지요 <button onClick={() => add(5)}>5 증가</button>
    </div>
  );
};

function App() {
  return (
    <ConunterProvider>
      <CounterComponent />
    </ConunterProvider>
  );
}

export default App;
```

# 테마 설정 예제

- /src/contexts/theme/ThemeContext.jsx

```jsx
const { createContext, useReducer, useContext } = require("react");

// 1. 초기값
const initialState = {
  theme: "white",
  fontSize: 14,
};
// 2. 리듀서
function reducer(state, action) {
  switch (action.type) {
    case "BLACK":
      return { ...state, theme: "black" };
    case "GREEN":
      return { ...state, theme: "green" };
    case "BASIC":
      return { ...state, theme: "white" };
    default:
      return state;
  }
}
// 3. 컨텍스트
const ThemeContext = createContext();
// 4. 프로바이더
export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    theme: state.theme,
    fontSize: state.fontSize,
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
    throw new Error("테마 컨텍스트가 없습니다.");
  }
  return ctx;
}
```

- 사용예(TailwindCss)

```jsx
const Popup = () => {
  const { theme, fontSize } = useTheme();
  return <div className={`bg-${theme}-500 font-[${fontSize}px]`}>팝업창</div>;
};
```
