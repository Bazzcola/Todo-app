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
  editTitleValue: string;
  editDescValue: string;
  saveId: any;
  saveIdTodo: any;
  saveTodoName: string;
  loader: boolean;
  loaderCat: boolean;
  setNewcategory: React.Dispatch<React.SetStateAction<Categories[]>>;
  setNewtodotask: React.Dispatch<React.SetStateAction<Todo[]>>;
  setNewfiltertodotask: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilteredCategory: React.Dispatch<React.SetStateAction<string>>;
  setEditTitleValue: React.Dispatch<React.SetStateAction<string>>;
  setEditDescValue: React.Dispatch<React.SetStateAction<string>>;
  setSaveId: React.Dispatch<React.SetStateAction<any>>;
  setSaveIdTodo: React.Dispatch<React.SetStateAction<any>>;
  setSaveTodoName: React.Dispatch<React.SetStateAction<string>>;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setLoaderCat: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValue = {
  newcategory: [],
  newtodotask: [],
  newfiltertodotask: [],
  filteredCategory: '',
  saveId: undefined,
  saveIdTodo: undefined,
  editTitleValue: '',
  editDescValue: '',
  saveTodoName: '',
  loader: true,
  loaderCat: true,
  setNewcategory: () => {},
  setNewtodotask: () => {},
  setEditTitleValue: () => {},
  setEditDescValue: () => {},
  setNewfiltertodotask: () => {},
  setFilteredCategory: () => {},
  setSaveId: () => {},
  setSaveIdTodo: () => {},
  setSaveTodoName: () => {},
  setLoader: () => {},
  setLoaderCat: () => {}
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
  const [editTitleValue, setEditTitleValue] = useState<string>('');
  const [editDescValue, setEditDescValue] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(true);
  const [loaderCat, setLoaderCat] = useState<boolean>(true);

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
        loaderCat,
        setLoaderCat,
        loader,
        setLoader,
        editDescValue,
        setEditDescValue,
        editTitleValue,
        setEditTitleValue,
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
