import { Todo, Todos } from '../domain/models';
import { SET, set, ADD, add, UPDATE, update, REMOVE, remove, TOGGLE, toggle } from './todos';

describe('todos', () => {
  describe('set', () => {
    it('returns an Action to tell the reducer "set todos"', () => {
      const action = set(Todos.factory([{ title: 'foo', detail: 'bar' }, { title: 'buz' }]));
      expect(action.type).toBe(SET);
      expect(Todos.getNumOf(action.payload.todos)).toBe(2);
    });
  });
  describe('add', () => {
    it('returns an Action to tell the reducer "add todo"', () => {
      const action = add(Todo.factory({ title: 'foo', detail: 'bar' }));
      expect(action.type).toBe(ADD);
      expect(action.payload.todo.title).toBe('foo');
      expect(action.payload.todo.detail).toBe('bar');
    });
  });
  describe('update', () => {
    it('returns an Action to tell the reducer "update todo"', () => {
      const todo = Todo.factory({ title: 'foo', detail: 'bar' });
      const action = update(todo.id, { title: 'hello', detail: undefined });
      expect(action.type).toBe(UPDATE);
      expect(action.payload.todo.title).toBe('hello');
      expect(action.payload.todo.detail).toBeUndefined();
    });
  });
  describe('remove', () => {
    it('returns an Action to tell the reducer "remove todo"', () => {
      const todo = Todo.factory({ title: 'foo', detail: 'bar' });
      const action = remove(todo.id);
      expect(action.type).toBe(REMOVE);
      expect(action.payload.id).toBe(todo.id);
    });
  });
  describe('toggle', () => {
    it('returns an Action to tell the reducer "toggle todo"', () => {
      const todo = Todo.factory({ title: 'foo', detail: 'bar' });
      const action = toggle(todo.id);
      expect(action.type).toBe(TOGGLE);
      expect(action.payload.id).toBe(todo.id);
    });
  });
});
