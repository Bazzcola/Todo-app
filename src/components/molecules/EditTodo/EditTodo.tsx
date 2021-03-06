import React, { useCallback, useContext, useState } from 'react';
import dayjs from 'dayjs';
import { TodoContext, Todo } from 'components/context/TodoContext';
import 'components/molecules/EditTodo/EditTodo.css';
/* eslint-disable */
export const EditTodo = () => {
  const { saveTodoTitle } = useContext(TodoContext);
  const { saveTodoDesc } = useContext(TodoContext);
  const { newcategory } = useContext(TodoContext);
  const { newtodotask, setNewtodotask } = useContext(TodoContext);
  const [editTodoTask, setEditTodoTask] = useState(saveTodoTitle);
  const [editDescriptionTodo, setEditDescriptionTodo] = useState(saveTodoDesc);
  const { saveTodoName } = useContext(TodoContext);
  const [editTodoValue, setEditTodoValue] = useState('low');
  const { saveIdTodo } = useContext(TodoContext);
  const [editCatName, setEditCatName] = useState(saveTodoName);
  const { editLoader, setEditLoader } = useContext(TodoContext);

  const editTime = () => {
    let today = new Date();
    let dateTime = dayjs(today).format('MMM D, YYYY h:mm A');
    return dateTime;
  };

  const EditTodo = useCallback(
    () => (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setNewtodotask((prevNewTodos) =>
        prevNewTodos.map((todo: Todo) =>
          todo.id === saveIdTodo
            ? {
                id: Math.round(Math.random() * 10000),
                title: editTodoTask,
                description: editDescriptionTodo,
                done: false,
                priority: editTodoValue,
                date: editTime(),
                categories: editCatName
              }
            : todo
        )
      );
      setEditTodoTask('');
      setEditDescriptionTodo('');
      setEditLoader(!editLoader);
    },
    [
      newtodotask,
      editTodoTask,
      editDescriptionTodo,
      editTime,
      editTodoValue,
      editCatName
    ]
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
    (event) => {
      setEditTodoValue(event.target.value);
    },
    [editTodoValue]
  );

  const editСategory = useCallback(
    (event) => {
      setEditCatName(event.target.value);
    },
    [editCatName]
  );

  return (
    <div className="form_box_edit__todo" id="edit13">
      <form onSubmit={EditTodo()} className="add_form">
        <h3>Priority level:</h3>
        <select onChange={editValue} className="priority_select">
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <br />
        <h3>Select Category:</h3>
        <select onChange={editСategory} className="priority_select">
          <option value={saveTodoName}> &#128293;{saveTodoName}</option>
          {newcategory.map((todo: { title: string; id: number }) => (
            <option value={todo.title} key={todo.id} onChange={editСategory}>
              {todo.title}
            </option>
          ))}
        </select>
        <br />
        <input type="text" onChange={setTodo} defaultValue={editTodoTask} />
        <br />
        <input
          type="text"
          onChange={setDesc}
          defaultValue={editDescriptionTodo}
        />
        <br />
        <button className="btn_add">Add</button>
      </form>
    </div>
  );
};
