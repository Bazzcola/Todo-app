import React, { useEffect, useContext } from 'react';
import { TodoCategoryItem } from 'components/molecules/TodoCategoryItem/TodoCategoryItem';
import { TodoContext } from 'components/context/TodoContext';
import { AddCategoryWindow } from 'components/molecules/AddCategoryWindow/AddCategoryWindow';
import 'components/organism/Todocategory/Todocategory.css';
/* eslint-disable */
export const Todocategory = () => {
  const { newcategory, setNewcategory } = useContext(TodoContext);
  const { loaderCat, setLoaderCat } = useContext(TodoContext);

  const hideBox = () => {
    setLoaderCat(!loaderCat);
  };

  const priorities: { [key: string]: number } = {
    none: 0,
    low: 1,
    medium: 2,
    high: 3
  };

  const sortedTodos = newcategory.sort(
    (a: { priority: string }, b: { priority: string }) => {
      return priorities[b.priority] - priorities[a.priority];
    }
  );

  useEffect(() => {
    setNewcategory(sortedTodos);
  }, [sortedTodos]);

  return (
    <div className="category_list__box">
      <div className="add_todo">
        <button className="add_cat" onClick={hideBox}>
          Add Category
        </button>
        <TodoCategoryItem />
      </div>
      {loaderCat ? loaderCat : <AddCategoryWindow />}
    </div>
  );
};
