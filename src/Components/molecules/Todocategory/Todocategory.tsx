import React, { useState, useCallback, useEffect } from 'react';
import 'components/molecules/Todocategory/Todocategory.css';

export const Todocategory = () => {
  const [todoCategory, setTodoCategory] = useState<string>('');
  const [newcategory, setNewcategory] = useState<any>([]);
  const [description, setDescription] = useState<string>('');

  const addCategory = useCallback(
    (event) => {
      event.preventDefault();
      if (!description.trim() || !todoCategory.trim()) return;
      setNewcategory([
        ...newcategory,
        {
          id: Math.round(Math.random() * 10000),
          title: todoCategory,
          description: description,
          done: false,
          priority: 'low',
          date: new Date()
        }
      ]);
      setTodoCategory('');
      setDescription('');
    },
    [todoCategory, description, newcategory]
  );

  useEffect(() => {
    console.log('todocategory', newcategory);
  }, [newcategory]);

  const setTodo = useCallback((event) => {
    setTodoCategory(event.target.value);
  }, []);

  const setDesc = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

  const doneValue = useCallback(
    (todo, index) => (event: any) => {
      const newtodos = [...newcategory];
      newtodos.splice(index, 1, {
        ...todo,
        done: !todo.done
      });
      setNewcategory(newtodos);
    },
    [newcategory]
  );

  const removeTodo = useCallback(
    (todo) => () => {
      setNewcategory(
        newcategory.filter((otherTodo: any) => otherTodo !== todo)
      );
    },
    [newcategory]
  );

  return (
    <div>
      <form onSubmit={addCategory}>
        <input onChange={setTodo} value={todoCategory} placeholder="Add Todo" />
        <input
          onChange={setDesc}
          value={description}
          placeholder="Add Description"
        />
        <button>Add</button>
      </form>
      <div className="add_todo">
        {newcategory.map(
          (
            todo: {
              description: string;
              id: number;
              title: string;
              done: boolean;
            },
            index: number
          ) => (
            <div className="add_todo__item" key={todo.id}>
              <h1 className={todo.done ? 'done' : ''}>{todo.title}</h1>
              <span className={todo.done ? 'done' : ''}>
                {todo.description}
              </span>
              <input
                type="checkbox"
                checked={newcategory.done}
                onChange={doneValue(todo, index)}
              />
              <button onClick={removeTodo(todo)}>Delete</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
