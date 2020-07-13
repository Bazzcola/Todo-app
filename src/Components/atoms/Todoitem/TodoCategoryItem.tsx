import React from 'react';
import 'TodoCategoryItem.css';

export const Todoitem = (todo: {
  description: string;
  id: number;
  title: string;
}) => {
  return (
    <div className="add_todo__item" key={todo.id}>
      <h1>{todo.title}</h1>
      <span>{todo.description}</span>
    </div>
  );
};
