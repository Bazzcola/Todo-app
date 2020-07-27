import React, { useEffect, useState } from 'react';

export interface Categories {
  description: string;
  id: number;
  title: string;
  done: boolean;
  priority: string;
  date: string;
}

export interface Todo {
  description: string;
  id: number;
  title: string;
  done: boolean;
  priority: string;
  date: string;
  categories: string;
}

interface Props {
  newcategory: Categories[];
  newtodotask: Todo[];
  description: string;
  value: string;
  addtodo: string;
  newfiltertodotask: Todo[];
  descriptionTodo: string;
  valueTodo: string;
  addtodoTitle: string;
  filteredCategory: string;
  saveId: any;
  saveIdTodo: any;
  saveTodoName: string;
  setNewcategory: React.Dispatch<React.SetStateAction<Categories[]>>;
  setNewtodotask: React.Dispatch<React.SetStateAction<Todo[]>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setAddtodo: React.Dispatch<React.SetStateAction<string>>;
  setNewfiltertodotask: React.Dispatch<React.SetStateAction<Todo[]>>;
  setDescriptionTodo: React.Dispatch<React.SetStateAction<string>>;
  setValueTodo: React.Dispatch<React.SetStateAction<string>>;
  setAddtodoTitle: React.Dispatch<React.SetStateAction<string>>;
  setFilteredCategory: React.Dispatch<React.SetStateAction<string>>;
  setSaveId: React.Dispatch<React.SetStateAction<any>>;
  setSaveIdTodo: React.Dispatch<React.SetStateAction<any>>;
  setSaveTodoName: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValue = {
  newcategory: [],
  newtodotask: [],
  description: '',
  value: 'none',
  addtodo: '',
  newfiltertodotask: [],
  descriptionTodo: '',
  valueTodo: 'none',
  addtodoTitle: '',
  filteredCategory: '',
  saveId: undefined,
  saveIdTodo: undefined,
  saveTodoName: '',
  setNewcategory: () => {},
  setNewtodotask: () => {},
  setDescription: () => {},
  setValue: () => {},
  setAddtodo: () => {},
  setNewfiltertodotask: () => {},
  setDescriptionTodo: () => {},
  setValueTodo: () => {},
  setAddtodoTitle: () => {},
  setFilteredCategory: () => {},
  setSaveId: () => {},
  setSaveIdTodo: () => {},
  setSaveTodoName: () => {}
};
export const TodoContext = React.createContext<Props>(defaultValue);

export const ProviderTodoContext = (props: any) => {
  const [newcategory, setNewcategory] = useState<Categories[]>([]);
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<string>('none');
  const [addtodo, setAddtodo] = useState<string>('');
  const [newtodotask, setNewtodotask] = useState<Todo[]>([]);
  const [newfiltertodotask, setNewfiltertodotask] = useState<Todo[]>([]);
  const [descriptionTodo, setDescriptionTodo] = useState<string>('');
  const [valueTodo, setValueTodo] = useState<string>('none');
  const [addtodoTitle, setAddtodoTitle] = useState<string>('');
  const [filteredCategory, setFilteredCategory] = useState<string>('');
  const [saveId, setSaveId] = useState<number | string>('');
  const [saveIdTodo, setSaveIdTodo] = useState<number | string>('');
  const [saveTodoName, setSaveTodoName] = useState<string>('');

  useEffect(() => {
    const data = localStorage.getItem('list_category');
    if (data) {
      setNewcategory(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('list_category', JSON.stringify(newcategory));
  });

  useEffect(() => {
    const data = localStorage.getItem('list_todo');
    if (data) {
      setNewtodotask(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('list_todo', JSON.stringify(newtodotask));
  });

  const { children } = props;
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
      {children}
    </TodoContext.Provider>
  );
};
