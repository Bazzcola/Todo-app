import React, { useContext, useCallback, useState } from 'react';
import { TodoContext } from 'components/context/TodoContext';
import dayjs from 'dayjs';
import 'components/molecules/AddTodoTaskWindow/AddTodoTaskWindow.css';

export const AddTodoTaskWindow = () => {
  const {
    newcategory,
    newtodotask,
    setNewtodotask,
    descriptionTodo,
    setDescriptionTodo,
    valueTodo,
    setValueTodo,
    addtodoTitle,
    setAddtodoTitle
  } = useContext<any>(TodoContext);
  const [addCat, setAddCat] = useState<any>('');
  const currentTime = () => {
    let today = new Date();
    let dateTime = dayjs(today).format('MMM D, YYYY h:mm A');
    return dateTime;
  };

  const addTodoItem = useCallback(
    (event) => {
      event.preventDefault();
      if (!descriptionTodo.trim() || !addtodoTitle.trim()) return;

      setNewtodotask([
        ...newtodotask,
        {
          id: Math.round(Math.random() * 10000),
          title: addtodoTitle,
          description: descriptionTodo,
          done: false,
          priority: valueTodo,
          date: currentTime(),
          categories: addCat
        }
      ]);
      setAddtodoTitle('');
      setDescriptionTodo('');
    },
    [addtodoTitle, descriptionTodo, newtodotask, valueTodo]
  );

  const setTodo = useCallback(
    (event) => {
      setAddtodoTitle(event.target.value);
    },
    [addtodoTitle]
  );

  const setDesc = useCallback(
    (event) => {
      setDescriptionTodo(event.target.value);
    },
    [descriptionTodo]
  );

  const addValue = useCallback(
    (event: any) => {
      setValueTodo(event.target.value);
    },
    [valueTodo]
  );
  const addCategory = useCallback(
    (event: any) => {
      setAddCat(event.target.value);
    },
    [addCat]
  );

  const hideBox = () => {
    let x: any = document.getElementById('form_hide2');
    if (x?.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  };
  return (
    <div className="form_box_todo" id="form_hide2" style={{ display: 'none' }}>
      <span onClick={hideBox}>X</span>
      <form onSubmit={addTodoItem} className="add_form">
        <h3>Priority level:</h3>
        <select onChange={addValue} className="priority_select">
          <option value="none">none</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <select onChange={addCategory} className="priority_select">
          {newcategory.map((todo: { title: string }) => (
            <option value={todo.title}>{todo.title}</option>
          ))}
        </select>
        <br />
        <input
          type="text"
          onChange={setTodo}
          value={addtodoTitle}
          placeholder="Add Todo"
        />
        <br />
        <input
          type="text"
          onChange={setDesc}
          value={descriptionTodo}
          placeholder="Add Description"
        />
        <br />
        <button className="btn_add">Add</button>
      </form>
    </div>
  );
};
