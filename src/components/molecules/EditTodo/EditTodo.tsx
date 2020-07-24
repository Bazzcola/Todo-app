import React, { useCallback, useContext, useState } from 'react';
import { TodoContext } from 'components/context/TodoContext';
import dayjs from 'dayjs';
import 'components/molecules/EditCategory/EditCategory.css';

export const EditTodo = () => {
  const { newtodotask, setNewtodotask } = useContext<any>(TodoContext);
  const [editTodoTask, setEditTodoTask] = useState<any>([]);
  const [editDescriptionTodo, setEditDescriptionTodo] = useState<any>([]);
  const [editTodoValue, setEditTodoValue] = useState<any>([]);
  const { saveIdTodo } = useContext(TodoContext);

  const editTime = () => {
    let today = new Date();
    let dateTime = dayjs(today).format('MMM D, YYYY h:mm A');
    return dateTime;
  };

  const EditTodo = useCallback(
    () => (e: any) => {
      e.preventDefault();
      setNewtodotask((prevNewTodos: any) =>
        prevNewTodos.map((todo: any) =>
          todo.id === saveIdTodo
            ? {
                id: Math.round(Math.random() * 10000),
                title: editTodoTask,
                description: editDescriptionTodo,
                done: false,
                priority: editTodoValue,
                date: editTime()
              }
            : todo
        )
      );
      setEditTodoTask('');
      setEditDescriptionTodo('');
    },
    [newtodotask, editTodoTask, editDescriptionTodo, editTime, editTodoValue]
  );

  const setTodo = useCallback(
    (event) => {
      setEditTodoTask(event.target.value);
    },
    [editTodoTask]
  );

  const setDesc = useCallback(
    (event) => {
      setEditDescriptionTodo(event.target.value);
    },
    [editDescriptionTodo]
  );

  const editValue = useCallback(
    (event: any) => {
      setEditTodoValue(event.target.value);
    },
    [editTodoValue]
  );

  const hideBox = () => {
    let x: any = document.getElementById('edit');
    x.style.display === 'none'
      ? (x.style.display = 'block')
      : (x.style.display = 'none');
  };

  return (
    <div className="form_box_edit__cat" id="edit" style={{ display: 'none' }}>
      <span onClick={hideBox}>X</span>
      <form onSubmit={EditTodo()} className="add_form">
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
          value={editTodoTask}
          placeholder="Add Todo"
        />
        <br />
        <input
          type="text"
          onChange={setDesc}
          value={editDescriptionTodo}
          placeholder="Add Description"
        />
        <br />
        <button className="btn_add">Add</button>
      </form>
    </div>
  );
};
