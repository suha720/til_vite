import { useParams } from "react-router-dom";
import TodoEdit from "../components/todos/TodoEdit";
import { useTodos } from "../contexts/todos/useTodos";
import { useEffect, useState } from "react";

const TodoEditPage = () => {
  // js
  const { id } = useParams();
  // 1. 전체 목록 가져와서 찾아내기
  // 아래 방식은 권장하지 않음, 차라리 액션 하나 만드시길 권장
  const { todos, findTodo } = useTodos();
  const [todo, setTodo] = useState(null);
  //   useEffect(() => {
  //     if (todos.length > 0) {
  //       const result = todos.find(item => item.id === id);
  //       console.log("전체 목록에서 아이디 찾기 : ", result);
  //     }
  //   }, [todos]);

  // 2. 아이디를 전달해서 해당하는 요소만 찾기
  // - action 을 하나 더 만들기
  useEffect(() => {
    if (id) {
      const result = findTodo(id);
      setTodo(result);
    }
  }, [id]);

  // 삼항 연산자보다 가독성이 좋다.
  if (!todo) {
    return <div>잘못된 아이디 입니다.</div>;
  }
  // jsx
  return (
    <div>
      <h2>편집창</h2>
      {todo && <TodoEdit todo={todo}></TodoEdit>}
    </div>
  );
};

export default TodoEditPage;
