import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [q, setQ] = useState("Hi");
  useEffect(() => {
    console.log(q);
  }, []);
  return (
    <div>
      <h1>App</h1>
      <button onClick={() => setCount(count + 1)}>count : {count}</button>
      <div>
        <input type="text" value={q} onChange={e => setQ(e.target.value)} />
      </div>
    </div>
  );
}

export default App;
