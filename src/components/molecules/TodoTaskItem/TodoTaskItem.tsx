import React, { useContext, useCallback } from 'react';
import { TodoContext } from 'components/context/TodoContext';
import 'components/molecules/TodoTaskItem/TodoTaskItem.css';

export const TodoTaskItem = () => {
  const { newtodotask, setNewtodotask } = useContext<any>(TodoContext);

  const removeTodoItem = useCallback(
    (todo) => () => {
      setNewtodotask(
        newtodotask.filter((otherTodo: any) => otherTodo !== todo)
      );
    },
    [newtodotask]
  );

  const doneValue = useCallback(
    (todo, index) => (event: any) => {
      const newtodos = [...newtodotask];
      newtodos.splice(index, 1, {
        ...todo,
        done: !todo.done
      });
      setNewtodotask(newtodos);
    },
    [newtodotask]
  );

  return (
    <>
      {newtodotask.map(
        (
          todo: {
            description: string;
            id: number;
            title: string;
            done: boolean;
            priority: string;
            date: string;
          },
          index: number
        ) => (
          <div className="add_todo__item_task" key={todo.id}>
            <p className="priority">Priority: {todo.priority}</p>
            <h1 className={todo.done ? 'done' : ''}>{todo.title}</h1>
            <input
              className="checkbox"
              type="checkbox"
              checked={newtodotask.done}
              onChange={doneValue(todo, index)}
            />
            <h2 className={todo.done ? 'done' : ''}>{todo.description}</h2>
            <span className="create_time">{todo.date}</span>
            <button onClick={removeTodoItem(todo)} className="delete_btn">
              Delete
            </button>
          </div>
        )
      )}
    </>
  );
};
