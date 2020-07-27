import React, { useState } from 'react';
import { Todocategory } from 'components/organism/Todocategory/Todocategory';
import { TodoTask } from 'components/organism/TodoTask/TodoTask';
import { TodoContext } from 'components/context/TodoContext';
import { AddCategoryWindow } from 'components/molecules/AddCategoryWindow/AddCategoryWindow';
import { AddTodoTaskWindow } from 'components/molecules/AddTodoTaskWindow/AddTodoTaskWindow';
import 'components/templates/Todomain/Todomain.css';
import { EditCategory } from 'components/molecules/EditCategory/EditCategory';
import { EditTodo } from 'components/molecules/EditTodo/EditTodo';

export const Todomain = () => {
  const [newcategory, setNewcategory] = useState<any>([]);
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<string>('none');
  const [addtodo, setAddtodo] = useState<string>('');
  const [newtodotask, setNewtodotask] = useState<any>([]);
  const [newfiltertodotask, setNewfiltertodotask] = useState<any>([]);
  const [descriptionTodo, setDescriptionTodo] = useState<string>('');
  const [valueTodo, setValueTodo] = useState<string>('none');
  const [addtodoTitle, setAddtodoTitle] = useState<string>('');
  const [filteredCategory, setFilteredCategory] = useState<string>('');
  const [saveId, setSaveId] = useState<number>();
  const [saveIdTodo, setSaveIdTodo] = useState<number>();
  const [saveTodoName, setSaveTodoName] = useState<string>('');

  return (
    <TodoContext.Provider
      value={{
        saveTodoName,
        setSaveTodoName,
        saveIdTodo,
        setSaveIdTodo,
        saveId,
        setSaveId,
        filteredCategory,
        setFilteredCategory,
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
        newfiltertodotask,
        setNewfiltertodotask,
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
        {/* <TodoTask /> */}
        <AddTodoTaskWindow />
        <EditCategory />
        <EditTodo />
      </div>
    </TodoContext.Provider>
  );
};
