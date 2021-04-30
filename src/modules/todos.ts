import { Todo, Todos } from '../domain/models';

export function createInitialState(): Todos.Model {
  return Todos.factory();
}

export type State = ReturnType<typeof createInitialState>;

export const SET = 'praiser/todos/set' as const;
export const ADD = 'praiser/todos/add' as const;
export const UPDATE = 'praiser/todos/update' as const;
export const REMOVE = 'praiser/todos/remove' as const;
export const TOGGLE = 'praiser/todos/toggle' as const;

export function set(todos: Todos.Model) {
  return {
    type: SET,
    payload: {
      todos,
    },
  };
}

export function add(todo: Todo.Model) {
  return {
    type: ADD,
    payload: {
      todo,
    },
  };
}

export function update(id: string, todo: Todo.Values) {
  return {
    type: UPDATE,
    payload: {
      id,
      todo,
    },
  };
}

export function remove(id: string) {
  return {
    type: REMOVE,
    payload: {
      id,
    },
  };
}

export function toggle(id: string) {
  return {
    type: TOGGLE,
    payload: {
      id,
    },
  };
}
