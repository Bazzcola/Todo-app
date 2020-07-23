import React, { useContext, useCallback } from 'react';
import { TodoContext } from 'components/context/TodoContext';
import 'components/molecules/TodoTaskItem/TodoTaskItem.css';

export const TodoTaskItem = () => {
  const { newtodotask, setNewtodotask } = useContext<any>(TodoContext);
  const { newfiltertodotask } = useContext<any>(TodoContext);
  const { filteredCategory } = useContext<any>(TodoContext);

  const removeTodoItem = useCallback(
    (todo) => () => {
      setNewtodotask((prevNewTodos: any) =>
        prevNewTodos.filter((otherTodo: any) => otherTodo !== todo)
      );
    },
    []
  );

  const doneValue = useCallback(
    (id: number) => () => {
      setNewtodotask((prevNewTodos: any) =>
        prevNewTodos.map((todo: any) => ({
          ...todo,
          done: todo.id === id ? !todo.done : todo.done
        }))
      );
    },
    []
  );
  const hideBox = () => {
    let x: any = document.getElementById('form_hide2');
    if (x && x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  };

  return (
    <>
      <div className="todo_list__box">
        <button className="add_todo__task" onClick={hideBox}>
          <p>+</p>
        </button>

        {(filteredCategory ? newfiltertodotask : newtodotask).map(
          (todo: {
            description: string;
            id: number;
            title: string;
            done: boolean;
            priority: string;
            date: string;
            categories: string;
          }) => (
            <div className="add_todo__item_task" key={todo.id}>
              <p>{todo.categories}</p>
              <p className="priority">Priority: {todo.priority}</p>
              <h1 className={todo.done ? 'done' : ''}>{todo.title}</h1>

              <input
                className="checkbox"
                type="checkbox"
                checked={todo.done}
                onChange={doneValue(todo.id)}
              />

              <h2 className={todo.done ? 'done' : ''}>{todo.description}</h2>
              <span className="create_time">{todo.date}</span>

              <br />

              <button className="edit_todo__task" onClick={hideBox}>
                Edit
              </button>

              <button onClick={removeTodoItem(todo)} className="delete_btn">
                Delete
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
};
