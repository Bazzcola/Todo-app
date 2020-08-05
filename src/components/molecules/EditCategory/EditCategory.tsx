import React, { useCallback, useContext, useState } from 'react';
import dayjs from 'dayjs';
import { TodoContext } from 'components/context/TodoContext';
import { Loader } from 'components/molecules/Loader/Loader';
import 'components/molecules/EditCategory/EditCategory.css';

export const EditCategory = () => {
  const { editDescValue } = useContext(TodoContext);
  const { editTitleValue } = useContext(TodoContext);
  const { newcategory, setNewcategory } = useContext(TodoContext);
  const [editTodo, setEditTodo] = useState([editTitleValue]);
  const [editDescription, setEditDescription] = useState([editDescValue]);
  const [editCatValue, setEditCatValue] = useState([]);
  const { saveId } = useContext(TodoContext);
  const { loader, setLoader } = useContext(TodoContext);

  const editTime = () => {
    let today = new Date();
    let dateTime = dayjs(today).format('MMM D, YYYY h:mm A');
    return dateTime;
  };

  const EditCategory = useCallback(
    () => (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setNewcategory((prevNewTodos) =>
        prevNewTodos.map((todo: any) =>
          todo.id === saveId
            ? {
                id: Math.round(Math.random() * 10000),
                title: editTodo,
                description: editDescription,
                done: false,
                priority: editCatValue,
                date: editTime()
              }
            : todo
        )
      );
      setEditTodo([]);
      setEditDescription([]);
      setLoader(!loader);
    },
    [newcategory, editTodo, editDescription, editTime, editCatValue]
  );

  const setTodo = useCallback(
    (event) => {
      setEditTodo(event.target.value);
    },
    [editTodo]
  );

  const setDesc = useCallback(
    (event) => {
      setEditDescription(event.target.value);
    },
    [editDescription]
  );

  const editValue = useCallback(
    (event) => {
      setEditCatValue(event.target.value);
    },
    [editCatValue]
  );

  // const hideBox = () => {
  //   let x: any = document.getElementById('edit');
  //   x.style.display === 'none'
  //     ? (x.style.display = 'block')
  //     : (x.style.display = 'none');
  // };

  return (
    <div className="form_box_edit__cat" id="edit" style={{ display: 'block' }}>
      <form onSubmit={EditCategory()} className="add_form">
        <h3>Priority level:</h3>
        <select onChange={editValue} className="priority_select">
          <option value="none">none</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <br />
        <input
          type="text"
          onChange={setTodo}
          // value={editTodo}
          defaultValue={editTodo}
        />
        <br />
        <input
          type="text"
          onChange={setDesc}
          // value={editDescription}
          defaultValue={editDescription}
        />
        <br />
        <button className="btn_add">Add</button>
      </form>
    </div>
  );
};
