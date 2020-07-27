import React, { useEffect, useContext } from 'react';
import { TodoContext } from 'components/context/TodoContext';
import { TodoTaskItem } from 'components/molecules/TodoTaskItem/TodoTaskItem';
import { AddTodoTaskWindow } from 'components/molecules/AddTodoTaskWindow/AddTodoTaskWindow';
import { EditTodo } from 'components/molecules/EditTodo/EditTodo';
import 'components/organism/TodoTask/TodoTask.css';

export const TodoTask = () => {
  const { newtodotask, setNewtodotask } = useContext(TodoContext);

  const hideBox = () => {
    let x: any = document.getElementById('form_hide2');
    if (x?.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
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

  return (
    <div className="todo_list__box">
      <button className="add_todo__task" onClick={hideBox}>
        <p>+</p>
      </button>
      <TodoTaskItem />
      <AddTodoTaskWindow />
      <EditTodo />
    </div>
  );
};
