import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTodos } from '../selectors/todos';
import * as Todos from '../modules/todos';
import { Home } from '../components/pages';

const ConnectedHome = () => {
  const todos = useSelector(getTodos);

  const dispatch = useDispatch();
  const actions = React.useMemo(
    () => ({
      removeTodo(id: string) {
        dispatch(Todos.remove(id));
      },
      toggleTodo(id: string) {
        dispatch(Todos.toggle(id));
      },
    }),
    [dispatch],
  );

  return <Home todos={todos} actions={actions} />;
};

export default ConnectedHome;
