import React, { useContext, useCallback, useEffect } from 'react';
import { TodoContext } from 'components/context/TodoContext';
import { EditCategory } from 'components/molecules/EditCategory/EditCategory';
import 'components/molecules/TodoCategoryItem/TodoCategoryItem.css';

export const TodoCategoryItem = () => {
  const { newcategory, setNewcategory } = useContext(TodoContext);
  const { newtodotask, setNewtodotask } = useContext(TodoContext);
  const { setNewfiltertodotask } = useContext(TodoContext);
  const { filteredCategory, setFilteredCategory } = useContext(TodoContext);
  const { setSaveId } = useContext(TodoContext);
  const { setEditDescValue } = useContext(TodoContext);
  const { setEditTitleValue } = useContext(TodoContext);
  const { loader, setLoader } = useContext(TodoContext);
  const { setGetTodoValue } = useContext(TodoContext);

  const removeTodo = useCallback(
    (todo) => () => {
      setNewcategory(newcategory.filter((otherTodo) => otherTodo !== todo));
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
      setGetTodoValue(todo.done);
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

  const edithideBox = (id: number, description: string, title: string) => {
    setSaveId(id);
    setEditDescValue(description);
    setEditTitleValue(title);
    setLoader(!loader);
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
            <div
              className="add_todo21"
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
                onClick={() =>
                  edithideBox(todo.id, todo.description, todo.title)
                }
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
