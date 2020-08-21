import React, { useEffect, useContext } from 'react';
import { TodoContext } from 'components/context/TodoContext';
import { TodoTaskItem } from 'components/molecules/TodoTaskItem/TodoTaskItem';
import { AddTodoTaskWindow } from 'components/molecules/AddTodoTaskWindow/AddTodoTaskWindow';
import 'components/organism/TodoTask/TodoTask.css';
/* eslint-disable */
export const TodoTask = () => {
  const { newtodotask, setNewtodotask } = useContext(TodoContext);
  const { taskloader, setTaskloader } = useContext(TodoContext);

  const hideBox = () => {
    setTaskloader(!taskloader);
  };

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

  return (
    <div className="todo_list__box">
      <div className="btn_box">
        <button className="add_todo__task" onClick={hideBox}>
          <p>+</p>
        </button>
      </div>
      <TodoTaskItem />
      {taskloader ? taskloader : <AddTodoTaskWindow />}
    </div>
  );
};
