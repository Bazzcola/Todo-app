import React, { useContext, useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { TodoContext } from 'components/context/TodoContext';
import 'components/molecules/AddTodoTaskWindow/AddTodoTaskWindow.css';

export const AddTodoTaskWindow = () => {
  const { newcategory, newtodotask, setNewtodotask } = useContext(TodoContext);
  const [descriptionTodo, setDescriptionTodo] = useState('');
  const [valueTodo, setValueTodo] = useState('low');
  const [addtodoTitle, setAddtodoTitle] = useState('');
  const [addCat, setAddCat] = useState('');
  const { taskloader, setTaskloader } = useContext(TodoContext);

  const currentTime = () => {
    let today = new Date();
    let dateTime = dayjs(today).format('MMM D, YYYY h:mm A');
    return dateTime;
  };

  const addTodoItem = useCallback(
    (event) => {
      event.preventDefault();
      if (!descriptionTodo.trim() || !addtodoTitle.trim() || !addCat.trim()) {
        let warning: HTMLElement | null | any = document.getElementById(
          'warning2'
        );
        if (warning && warning.style.display === 'none') {
          warning.style.display = 'block';
        }
        return;
      } else {
        let warning: HTMLElement | null | any = document.getElementById(
          'warning2'
        );
        if (warning.style.display === 'block' && descriptionTodo) {
          warning.style.display = 'none';
        }
      }

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
      setTaskloader(!taskloader);
    },
    [addtodoTitle, descriptionTodo, newtodotask, valueTodo, addCat]
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
    (event) => {
      setValueTodo(event.target.value);
    },
    [valueTodo]
  );
  const addCategory = useCallback(
    (event) => {
      setAddCat(event.target.value);
    },
    [addCat]
  );

  return (
    <div className="form_box_todo" id="form_hide2">
      <form onSubmit={addTodoItem} className="add_form">
        <p id="warning2" style={{ display: 'none' }} className="warning2">
          Fill all fields
        </p>
        <h3>Priority level:</h3>
        <select onChange={addValue} className="priority_select">
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <h3>Category:</h3>
        <select onChange={addCategory} className="priority_select">
          <option>none</option>
          {newcategory.map((todo: { title: string; id: number }) => (
            <option value={todo.title} key={todo.id}>
              {todo.title}
            </option>
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
