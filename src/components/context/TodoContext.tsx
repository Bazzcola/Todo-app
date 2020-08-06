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

export interface Props {
  editLoader: boolean;
  newcategory: Categories[];
  newtodotask: Todo[];
  newfiltertodotask: Todo[];
  filteredCategory: string;
  editTitleValue: string;
  editDescValue: string;
  saveId: number | null;
  saveIdTodo: number | null;
  saveTodoName: string;
  loader: boolean;
  loaderCat: boolean;
  taskloader: boolean;
  saveTodoTitle: string;
  saveTodoDesc: string;
  catPriority: string;
  setCatPriority: React.Dispatch<React.SetStateAction<string>>;
  setEditLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskloader: React.Dispatch<React.SetStateAction<boolean>>;
  setNewcategory: React.Dispatch<React.SetStateAction<Categories[]>>;
  setNewtodotask: React.Dispatch<React.SetStateAction<Todo[]>>;
  setNewfiltertodotask: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilteredCategory: React.Dispatch<React.SetStateAction<string>>;
  setEditTitleValue: React.Dispatch<React.SetStateAction<string>>;
  setEditDescValue: React.Dispatch<React.SetStateAction<string>>;
  setSaveId: React.Dispatch<React.SetStateAction<number | null>>;
  setSaveIdTodo: React.Dispatch<React.SetStateAction<number | null>>;
  setSaveTodoName: React.Dispatch<React.SetStateAction<string>>;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setLoaderCat: React.Dispatch<React.SetStateAction<boolean>>;
  setSaveTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  setSaveTodoDesc: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValue = {
  newcategory: [],
  newtodotask: [],
  newfiltertodotask: [],
  filteredCategory: '',
  saveId: null,
  saveIdTodo: null,
  editTitleValue: '',
  editDescValue: '',
  saveTodoName: '',
  loader: true,
  loaderCat: true,
  taskloader: true,
  editLoader: true,
  saveTodoDesc: '',
  saveTodoTitle: '',
  catPriority: '',
  setCatPriority: () => {},
  setTaskloader: () => {},
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
  setLoaderCat: () => {},
  setSaveTodoDesc: () => {},
  setSaveTodoTitle: () => {},
  setEditLoader: () => {}
};
export const TodoContext = React.createContext<Props>(defaultValue);

export const ProviderTodoContext = (props: any) => {
  const [catPriority, setCatPriority] = useState<string>('');
  const [editLoader, setEditLoader] = useState<boolean>(true);
  const [newcategory, setNewcategory] = useState<Categories[]>([]);
  const [newtodotask, setNewtodotask] = useState<Todo[]>([]);
  const [newfiltertodotask, setNewfiltertodotask] = useState<Todo[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<string>('');
  const [saveId, setSaveId] = useState<number | null>(null);
  const [saveIdTodo, setSaveIdTodo] = useState<number | null>(null);
  const [saveTodoName, setSaveTodoName] = useState<string>('');
  const [editTitleValue, setEditTitleValue] = useState<string>('');
  const [editDescValue, setEditDescValue] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(true);
  const [loaderCat, setLoaderCat] = useState<boolean>(true);
  const [taskloader, setTaskloader] = useState<boolean>(true);
  const [saveTodoDesc, setSaveTodoDesc] = useState<string>('');
  const [saveTodoTitle, setSaveTodoTitle] = useState<string>('');
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
        catPriority,
        setCatPriority,
        editLoader,
        setEditLoader,
        saveTodoDesc,
        setSaveTodoDesc,
        saveTodoTitle,
        setSaveTodoTitle,
        taskloader,
        setTaskloader,
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
