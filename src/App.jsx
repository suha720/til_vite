import { useState } from "react";
import TodoList from "./components/todos/TodoList";
import TodoWrite from "./components/todos/TodoWrite";
import { TodoProvider } from "./contexts/todos/context";
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import TodoWritePage from "./pages/TodoWritePage";
import TodoListPage from "./pages/TodoListPage";
import TodoReadPage from "./pages/TodoReadPage";
import TodoEditPage from "./pages/TodoEditPage";
import NotFound from "./pages/NotFound";

function App() {
  // js 자리
  // 오로지 하나만 편집이 가능하도록 ID 를 저장해둠
  const [editId, setEditId] = useState(null);
  // 편집을 시작했다.
  const onStartEdit = id => {
    setEditId(id);
  };
  // 편집을 종료했다.
  const onEndEdit = () => {
    setEditId(null);
  };
  // jsx 자리
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 ">
      <Router>
        {/* 헤더 */}
        <header className=" sticky top-0 z-0 bg-white/80 backdrop-blur border-b border-neutral-200 dark:bg-neutral-950/60 dark:border-neutral-800">
          <div className="container-app py-3 flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight">
              <NavLink to={"/"}>할일 앱 서비스</NavLink>
            </h1>
            <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              <nav className="flex items-center gap-2 text-sm">
                <NavLink to={"/"}>🛴 Home</NavLink>
                <NavLink to={"/todos"}>🚿 할 일 목록</NavLink>
                <NavLink to={"/todos/write"}>🛁 할 일 등록</NavLink>
              </nav>
            </div>
          </div>
        </header>
        {/* 메인 */}

        <main className="container-app py-6">
          <TodoProvider>
            <Routes>
              <Route path="/" element={<Home></Home>} />
              <Route path="/todos" element={<TodoListPage />} />
              <Route path="/todos/write" element={<TodoWritePage />} />
              <Route path="/todos/:id" element={<TodoReadPage />} />
              <Route path="/todos/:id/edit" element={<TodoEditPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* 할일작성 */}
            {/* 할일목록 */}
          </TodoProvider>
        </main>
        {/* 하단 */}
        <footer className="mt-8 border-t border-neutral-200 py-6 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          {/* HTML 특수기호 (Entity) */}
          {/* https://maggie-a.tistory.com/353 참고하기 */}
          &copy; 2025 by <a href="mailto:suha720t@naver.com">suha</a>{" "}
        </footer>
      </Router>
    </div>
  );
}

export default App;
