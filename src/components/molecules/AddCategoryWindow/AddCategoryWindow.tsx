import React, { useCallback, useContext, useState } from 'react';
import dayjs from 'dayjs';
import { TodoContext } from 'components/context/TodoContext';
import 'components/molecules/AddCategoryWindow/AddCategoryWindow.css';

export const AddCategoryWindow = () => {
  const { newcategory, setNewcategory } = useContext(TodoContext);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [addtodo, setAddtodo] = useState('');
  const { loaderCat, setLoaderCat } = useContext(TodoContext);
  const currentTime = () => {
    let today = new Date();
    let dateTime = dayjs(today).format('MMM D, YYYY h:mm A');
    return dateTime;
  };

  const addCategory = useCallback(
    (event) => {
      event.preventDefault();
      if (!description.trim() || !addtodo.trim()) {
        let warning: HTMLElement | null | any = document.getElementById(
          'warning'
        );
        if (warning && warning.style.display === 'none') {
          warning.style.display = 'block';
        }
        return;
      } else {
        let warning: HTMLElement | null | any = document.getElementById(
          'warning'
        );
        if (warning.style.display === 'block' && description) {
          warning.style.display = 'none';
        }
      }

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
      setLoaderCat(!loaderCat);
    },
    [addtodo, description, newcategory, value]
  );

  const setTodo = useCallback(
    (event) => {
      setAddtodo(event.target.value);
    },
    [addtodo]
  );

  const setDesc = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [description]
  );

  const addValue = useCallback(
    (event: any) => {
      setValue(event.target.value);
    },
    [value]
  );

  const hideBox = () => {
    let x: any = document.getElementById('form_hide');
    if (x?.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  };

  return (
    <div className="form_box" id="form_hide">
      <span onClick={hideBox}>X</span>
      <form onSubmit={addCategory} className="add_form">
        <p id="warning" style={{ display: 'none' }} className="warning">
          Fill all fields
        </p>
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
          placeholder="Add Category"
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
  );
};
