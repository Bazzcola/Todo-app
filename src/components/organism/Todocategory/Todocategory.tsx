import React, { useState, useCallback, useEffect } from 'react';
import dayjs from 'dayjs';
import 'components/organism/Todocategory/Todocategory.css';

export const Todocategory = () => {
  const [addtodo, setAddtodo] = useState<string>('');
  const [newcategory, setNewcategory] = useState<any>([]);
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<string>('none');

  const currentTime = () => {
    let today = new Date();
    let dateTime = dayjs(today).format('MMM D, YYYY h:mm A');
    return dateTime;
  };

  const addCategory = useCallback(
    (event) => {
      event.preventDefault();
      if (!description.trim() || !addtodo.trim()) return;

      setNewcategory([
        ...newcategory,
        {
          id: Math.round(Math.random() * 10000),
          title: addtodo,
          description: description,
          done: false,
          priority: value,
          date: currentTime()
        }
      ]);
      setAddtodo('');
      setDescription('');
    },
    [addtodo, description, newcategory, value]
  );

  const setTodo = useCallback((event) => {
    setAddtodo(event.target.value);
  }, []);

  const setDesc = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

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

  const removeTodo = useCallback(
    (todo) => () => {
      setNewcategory(
        newcategory.filter((otherTodo: any) => otherTodo !== todo)
      );
    },
    [newcategory]
  );
  const hideBox = () => {
    let x: any = document.getElementById('form_hide');
    if (x?.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  };
  const addValue = useCallback((event: any) => {
    setValue(event.target.value);
  }, []);
  // { none: number, low: number, medium: number, high: number }
  const priorities: any = {
    none: 0,
    low: 1,
    medium: 2,
    high: 3
  };
  const sortedTodos = newcategory.sort((a: any, b: any) => {
    return priorities[b.priority] - priorities[a.priority];
  });
  useEffect(() => {
    setNewcategory(sortedTodos);
  }, [sortedTodos]);

  useEffect(() => {
    const data = localStorage.getItem('list');
    if (data) {
      setNewcategory(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(sortedTodos));
  });

  return (
    <div className="todo_list__box">
      <div className="form_box" id="form_hide" style={{ display: 'none' }}>
        <span onClick={hideBox}>X</span>
        <form onSubmit={addCategory} className="add_form">
          <h3>Priority level:</h3>
          <select onChange={addValue} className="priority_select">
            <option value="none">none</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
          <br />
          <input
            type="text"
            onChange={setTodo}
            value={addtodo}
            placeholder="Add Todo"
          />
          <br />
          <input
            type="text"
            onChange={setDesc}
            value={description}
            placeholder="Add Description"
          />
          <br />
          <button className="btn_add">Add</button>
        </form>
      </div>
      <div className="add_todo">
        <button className="add_cat" onClick={hideBox}>
          Add
        </button>
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
              <button onClick={removeTodo(todo)} className="delete_btn">
                Delete
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
