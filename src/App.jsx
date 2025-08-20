import { ConunterProvider } from "./contexts/counter/context";
import { CounterProvider } from "./contexts/counter/CounterContext";
import { useCounter } from "./contexts/counter/useCounter";
import { useTheme } from "./contexts/theme/ThemeContext";

const Popup = () => {
  const { theme, fontSize } = useTheme();
  return <div className={`bg-${theme}-500 font-[${fontSize}px]`}>팝업창</div>;
};

const CounterComponent = () => {
  const { v, increment } = useCounter();

  return (
    <div>
      카운터 : {v} <button onClick={increment}>증가</button>
    </div>
  );
};

function App() {
  return (
    <CounterProvider>
      <CounterComponent />
    </CounterProvider>
  );
}

export default App;
