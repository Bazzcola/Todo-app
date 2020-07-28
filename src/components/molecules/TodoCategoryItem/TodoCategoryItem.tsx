import React, { useContext, useCallback, useEffect } from 'react';
import { TodoContext } from 'components/context/TodoContext';
import 'components/molecules/TodoCategoryItem/TodoCategoryItem.css';

export const TodoCategoryItem = () => {
  const { newcategory, setNewcategory } = useContext(TodoContext);
  const { newtodotask, setNewtodotask } = useContext(TodoContext);
  const { setNewfiltertodotask } = useContext(TodoContext);
  const { filteredCategory, setFilteredCategory } = useContext(TodoContext);
  const { setSaveId } = useContext(TodoContext);

  const removeTodo = useCallback(
    (todo) => () => {
      setNewcategory(
        newcategory.filter((otherTodo: any) => otherTodo !== todo)
      );
    },
    [newcategory]
  );

  const doneValue = useCallback(
    (todo, index) => () => {
      const newtodos = [...newcategory];
      newtodos.splice(index, 1, {
        ...todo,
        done: !todo.done
      });
      setNewcategory(newtodos);
    },
    [newcategory]
  );

  const edithideBox = (id: number) => {
    setSaveId(id);
    let x: any = document.getElementById('edit');
    x.style.display === 'none'
      ? (x.style.display = 'block')
      : (x.style.display = 'none');
  };
  const priorities: any = {
    none: 0,
    low: 1,
    medium: 2,
    high: 3
  };

  const sortedTodosTask = newtodotask.sort((a: any, b: any) => {
    return priorities[b.priority] - priorities[a.priority];
  });
  useEffect(() => {
    setNewtodotask(sortedTodosTask);
  }, [sortedTodosTask]);

  useEffect(() => {
    const x = newtodotask.filter(
      (elem: any) => elem.categories === filteredCategory
    );
    setNewfiltertodotask(x);
  }, [filteredCategory, newtodotask]);

  const clickCat = (title: any) => () => {
    setFilteredCategory(title);
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
          <div key={todo.id}>
            <div
              className="add_todo__item"
              key={todo.id}
              onClick={clickCat(todo.title)}
            >
              <p className="priority_level">Priority: {todo.priority}</p>
              <h1 className={todo.done ? 'done' : ''}>{todo.title}</h1>
              <input
                className="checkbox"
                type="checkbox"
                checked={todo.done}
                onChange={doneValue(todo, index)}
              />
              <h2 className={todo.done ? 'done' : ''}>{todo.description}</h2>
              <span className="create_time">{todo.date}</span>
              <button
                className="edit_todo__cat"
                onClick={() => edithideBox(todo.id)}
              >
                Edit
              </button>
              <button onClick={removeTodo(todo)} className="delete_btn">
                Delete
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
};