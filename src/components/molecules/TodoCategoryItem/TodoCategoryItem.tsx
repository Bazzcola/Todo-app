import React, { useContext, useCallback, useEffect } from 'react';
import { TodoContext } from 'components/context/TodoContext';
import { EditCategory } from 'components/molecules/EditCategory/EditCategory';
import 'components/molecules/TodoCategoryItem/TodoCategoryItem.css';
/* eslint-disable */
export const TodoCategoryItem = () => {
  const { newcategory, setNewcategory } = useContext(TodoContext);
  const { newtodotask, setNewtodotask } = useContext(TodoContext);
  const { setNewfiltertodotask } = useContext(TodoContext);
  const { filteredCategory, setFilteredCategory } = useContext(TodoContext);
  const { setSaveId } = useContext(TodoContext);
  const { setEditDescValue } = useContext(TodoContext);
  const { setEditTitleValue } = useContext(TodoContext);
  const { loader, setLoader } = useContext(TodoContext);
  const { setCatPriority } = useContext(TodoContext);

  const removeTodo = useCallback(
    (todo) => () => {
      setNewcategory(newcategory.filter((otherTodo) => otherTodo !== todo));
      setNewtodotask(
        newtodotask.filter((item) => item.categories !== todo.title)
      );
    },
    [newcategory, newtodotask]
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

  const priorities: { [key: string]: number } = {
    none: 0,
    low: 1,
    medium: 2,
    high: 3
  };

  const sortedTodosTask = newtodotask.sort(
    (a: { priority: string }, b: { priority: string }) => {
      return priorities[b.priority] - priorities[a.priority];
    }
  );

  useEffect(() => {
    setNewtodotask(sortedTodosTask);
  }, [sortedTodosTask]);

  useEffect(() => {
    const x = newtodotask.filter(
      (elem) => elem.categories === filteredCategory
    );
    setNewfiltertodotask(x);
  }, [filteredCategory, newtodotask]);

  const clickCat = (title: string) => () => {
    setFilteredCategory(title);
  };

  const edithideBox = (
    id: number,
    description: string,
    title: string,
    priority: string
  ) => {
    setSaveId(id);
    setEditDescValue(description);
    setEditTitleValue(title);
    setLoader(!loader);
    setCatPriority(priority);
  };

  return (
    <>
      {loader ? loader : <EditCategory />}
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
          <div key={todo.id} className="add_todo__item">
            <input
              className="checkbox"
              type="checkbox"
              checked={todo.done}
              onChange={doneValue(todo, index)}
            />
            <div
              className="add_todo21"
              key={todo.id}
              onClick={clickCat(todo.title)}
            >
              <p className="priority_level">Priority: {todo.priority}</p>
              <h1 className={todo.done ? 'done' : ''}>{todo.title}</h1>
              <h2 className={todo.done ? 'done' : ''}>{todo.description}</h2>
              <span className="create_time">{todo.date}</span>
            </div>
            <button
              className="edit_todo__cat"
              onClick={() =>
                edithideBox(
                  todo.id,
                  todo.description,
                  todo.title,
                  todo.priority
                )
              }
            >
              Edit
            </button>
            <button onClick={removeTodo(todo)} className="delete_btn">
              Delete
            </button>
          </div>
        )
      )}
    </>
  );
};
