import { useState } from "react";
import TodoList from "./components/todos/TodoList";
import TodoWrite from "./components/todos/TodoWrite";
import { TodoProvider } from "./contexts/todos/context";

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
      {/* 헤더 */}
      <header className=" sticky top-0 z-0 bg-white/80 backdrop-blur border-b border-neutral-200 dark:bg-neutral-950/60 dark:border-neutral-800">
        <div className="container-app py-3 flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight">
            할일 앱 서비스
          </h1>
          <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Tailwind UI
          </div>
        </div>
      </header>
      {/* 메인 */}

      <main className="container-app py-6">
        <TodoProvider>
          {/* 할일작성 */}
          <section className="mb-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-card transition dark:border-neutral-800 dark:bg-neutral-950">
            <h2 className="mb-3 text-base font-semibold">새 할일 추가</h2>
            <TodoWrite onEndEdit={onEndEdit} />
          </section>
          {/* 할일목록 */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-card transition dark:border-neutral-800 dark:bg-neutral-950">
            <TodoList
              onEndEdit={onEndEdit}
              onStartEdit={onStartEdit}
              editId={editId}
            />
          </section>
        </TodoProvider>
      </main>
      {/* 하단 */}
      <footer className="mt-8 border-t border-neutral-200 py-6 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        {/* HTML 특수기호 (Entity) */}
        {/* https://maggie-a.tistory.com/353 참고하기 */}
        &copy; 2025 by <a href="mailto:suha720t@naver.com">suha</a>{" "}
      </footer>
    </div>
  );
}

export default App;
