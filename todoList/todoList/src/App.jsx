import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [inputTodo, setInputTodo] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [openTodoNo, setOpenTodoNo] = useState(null);

  // 공통적으로 사용할 데이터 조회 함수
  const getTodos = async () => {
    try {
      const res = await axios.get("/api/todos");
      setTodoList(res.data);
    } catch (err) {
      console.error("할 일 목록 조회 실패:", err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    if (inputTodo.trim() === "") return;

    try {
      await axios.post("/api/todos", {
        todoTitle: inputTodo,
        todoContent: inputContent,
      });
      await getTodos(); // 새로고침
      setInputTodo("");
      setInputContent("");
    } catch (err) {
      console.error("할 일 추가 실패:", err);
    }
  };

  const deleteTodo = async (idToDelete) => {
    try {
      await axios.delete(`/api/todos/${idToDelete}`);
      await getTodos();
    } catch (err) {
      console.error("할 일 삭제 실패:", err);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      await axios.put(`/api/todos/${todo.todoNo}/complete`, {
        complete: todo.complete === "Y" ? "N" : "Y",
      });
      await getTodos();
    } catch (err) {
      console.error("완료 여부 변경 실패:", err);
    }
  };

  const toggleContent = (todoNo) => {
    setOpenTodoNo((prev) => (prev === todoNo ? null : todoNo));
  };

  const totalCount = todoList.length;
  const completeCount = todoList.filter((todo) => todo.complete === "Y").length;

  return (
    <div className="todo-app">
      <header className="todo-header">
        <h1>TodoList</h1>
        <h2>
          전체 할 일: {totalCount}개 / 완료한 일: {completeCount}개
        </h2>
      </header>

      <section className="todo-input-section">
        <p>할 일 입력</p>
        <textarea
          className="todo-input-title"
          placeholder="제목 입력"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        ></textarea>
        <br />
        <textarea
          className="todo-input-content"
          placeholder="내용 입력"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
        ></textarea>
        <br />
        <button className="todo-add-button" onClick={addTodo}>
          전송
        </button>
      </section>

      <hr />

      <ul className="todo-list">
        {todoList.map((todo) => (
          <li key={todo.todoNo} className="todo-item">
            <span
              className={`todo-title ${
                todo.complete === "Y" ? "todo-complete" : ""
              }`}
              onClick={() => toggleContent(todo.todoNo)}
            >
              {todo.todoTitle}
            </span>
            <button
              className="todo-toggle-button"
              onClick={() => toggleComplete(todo)}
            >
              완료/진행중
            </button>
            <button
              className="todo-delete-button"
              onClick={() => deleteTodo(todo.todoNo)}
            >
              삭제
            </button>
            {openTodoNo === todo.todoNo && (
              <div className="todo-content">{todo.todoContent}</div>
            )}
          </li>
        ))}
      </ul>

      <footer className="todo-footer">
        <p className="read-the-docs">할 일을 선택해 보세요.</p>
      </footer>
    </div>
  );
}

export default App;
