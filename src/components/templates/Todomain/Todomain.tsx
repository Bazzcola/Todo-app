import React from 'react';
import { Todocategory } from 'components/organism/Todocategory/Todocategory';
import { TodoTask } from 'components/organism/TodoTask/TodoTask';
import { ProviderTodoContext } from 'components/context/TodoContext';
import 'components/templates/Todomain/Todomain.css';

export const Todomain = () => {
  return (
    <ProviderTodoContext>
      <div className="container">
        <Todocategory />
        <TodoTask />
      </div>
    </ProviderTodoContext>
  );
};
