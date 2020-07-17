import React, { useEffect, useContext } from 'react';
import 'components/organism/Todocategory/Todocategory.css';
import { TodoCategoryItem } from 'components/molecules/TodoCategoryItem/TodoCategoryItem';
import { TodoContext } from 'components/context/TodoContext';

export const Todocategory = () => {
  const { newcategory, setNewcategory } = useContext<any>(TodoContext);

  const hideBox = () => {
    let x: any = document.getElementById('form_hide');
    if (x?.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  };

  // { none: number, low: number, medium: number, high: number }
  const priorities: any = {
    none: 0,
    low: 1,
    medium: 2,
    high: 3
  };

  const sortedTodos = newcategory.sort((a: any, b: any) => {
    return priorities[b.priority] - priorities[a.priority];
  });
  useEffect(() => {
    setNewcategory(sortedTodos);
  }, [sortedTodos]);

  useEffect(() => {
    const data = localStorage.getItem('list_category');
    if (data) {
      setNewcategory(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('list_category', JSON.stringify(sortedTodos));
  });

  return (
    <div className="category_list__box">
      <div className="add_todo">
        <button className="add_cat" onClick={hideBox}>
          Add Category
        </button>
        <TodoCategoryItem />
      </div>
    </div>
  );
};
