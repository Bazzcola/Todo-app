import React, { useContext, useCallback } from 'react';
import { TodoContext } from 'components/context/TodoContext';
import 'components/molecules/TodoCategoryItem/TodoCategoryItem.css';
import { TodoTaskItem } from '../TodoTaskItem/TodoTaskItem';

export const TodoCategoryItem = () => {
  const { newcategory, setNewcategory } = useContext<any>(TodoContext);

  const removeTodo = useCallback(
    (todo) => () => {
      setNewcategory(
        newcategory.filter((otherTodo: any) => otherTodo !== todo)
      );
    },
    [newcategory]
  );

  const doneValue = useCallback(
    (todo, index) => (event: any) => {
      const newtodos = [...newcategory];
      newtodos.splice(index, 1, {
        ...todo,
        done: !todo.done
      });
      setNewcategory(newtodos);
    },
    [newcategory]
  );

  const edithideBox = () => {
    let x: any = document.getElementById('edit');
    x.style.display === 'none'
      ? (x.style.display = 'block')
      : (x.style.display = 'none');
  };

  return (
    <>
      {newcategory.map(
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
          <div className="add_todo__item" key={todo.id}>
            <p className="priority">Priority: {todo.priority}</p>
            <h1 className={todo.done ? 'done' : ''}>{todo.title}</h1>
            <input
              className="checkbox"
              type="checkbox"
              checked={newcategory.done}
              onChange={doneValue(todo, index)}
            />
            <h2 className={todo.done ? 'done' : ''}>{todo.description}</h2>
            <span className="create_time">{todo.date}</span>
            <button className="edit_todo__cat" onClick={edithideBox}>
              Edit
            </button>
            <button onClick={removeTodo(todo)} className="delete_btn">
              Delete
            </button>
          </div>
        )
      )}
      <div className="item_box">
        <TodoTaskItem />
      </div>
    </>
  );
};
