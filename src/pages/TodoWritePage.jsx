import TodoWrite from "../components/todos/TodoWrite";

const TodoWritePage = () => {
  return (
    <div>
      <section className="mb-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-card transition dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="mb-3 text-base font-semibold">새 할일 추가</h2>

        <TodoWrite></TodoWrite>
        {/* <TodoWrite onEndEdit={onEndEdit} /> */}
      </section>
    </div>
  );
};

export default TodoWritePage;
