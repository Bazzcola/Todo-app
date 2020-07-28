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
  newfiltertodotask: Todo[];
  filteredCategory: string;
  saveId: any;
  saveIdTodo: any;
  saveTodoName: string;
  setNewcategory: React.Dispatch<React.SetStateAction<Categories[]>>;
  setNewtodotask: React.Dispatch<React.SetStateAction<Todo[]>>;
  setNewfiltertodotask: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilteredCategory: React.Dispatch<React.SetStateAction<string>>;
  setSaveId: React.Dispatch<React.SetStateAction<any>>;
  setSaveIdTodo: React.Dispatch<React.SetStateAction<any>>;
  setSaveTodoName: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValue = {
  newcategory: [],
  newtodotask: [],
  newfiltertodotask: [],
  filteredCategory: '',
  saveId: undefined,
  saveIdTodo: undefined,
  saveTodoName: '',
  setNewcategory: () => {},
  setNewtodotask: () => {},
  setNewfiltertodotask: () => {},
  setFilteredCategory: () => {},
  setSaveId: () => {},
  setSaveIdTodo: () => {},
  setSaveTodoName: () => {}
};
export const TodoContext = React.createContext<Props>(defaultValue);

export const ProviderTodoContext = (props: any) => {
  const [newcategory, setNewcategory] = useState<Categories[]>([]);
  const [newtodotask, setNewtodotask] = useState<Todo[]>([]);
  const [newfiltertodotask, setNewfiltertodotask] = useState<Todo[]>([]);
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
        newtodotask,
        setNewtodotask,
        newfiltertodotask,
        setNewfiltertodotask
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
