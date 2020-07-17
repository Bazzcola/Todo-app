import React, { useState } from 'react';
import { Todocategory } from 'components/organism/Todocategory/Todocategory';
import { TodoTask } from 'components/organism/TodoTask/TodoTask';
import { TodoContext } from 'components/context/TodoContext';
import { AddCategoryWindow } from 'components/molecules/AddCategoryWindow/AddCategoryWindow';
import { AddTodoTaskWindow } from 'components/molecules/AddTodoTaskWindow/AddTodoTaskWindow';
import 'components/templates/Todomain/Todomain.css';

export const Todomain = () => {
  const [newcategory, setNewcategory] = useState<any>([]);
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<string>('none');
  const [addtodo, setAddtodo] = useState<string>('');
  const [newtodotask, setNewtodotask] = useState<any>([]);
  const [descriptionTodo, setDescriptionTodo] = useState<string>('');
  const [valueTodo, setValueTodo] = useState<string>('none');
  const [addtodoTitle, setAddtodoTitle] = useState<string>('');

  return (
    <TodoContext.Provider
      value={{
        newcategory,
        setNewcategory,
        description,
        setDescription,
        value,
        setValue,
        addtodo,
        setAddtodo,
        newtodotask,
        setNewtodotask,
        descriptionTodo,
        setDescriptionTodo,
        valueTodo,
        setValueTodo,
        addtodoTitle,
        setAddtodoTitle
      }}
    >
      <div className="container">
        <AddCategoryWindow />
        <Todocategory />
        <TodoTask />
        <AddTodoTaskWindow />
      </div>
    </TodoContext.Provider>
  );
};
