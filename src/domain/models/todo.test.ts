import * as Todo from './todo';

import sleep from '../../lib/sleep';

const ISO8601_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/u;

describe('Todo', () => {
  describe('factory', () => {
    it('returns an instance of Todo model', () => {
      const todo = Todo.factory({
        title: 'Try building apps with React Native',
        detail: 'Build Hello World app',
      });

      expect(todo.id.length).toBe(36);
      expect(todo.title).toBe('Try building apps with React Native');
      expect(todo.detail).toBe('Build Hello World app');
      expect(todo.completedAt).toBeNull();
      expect(todo.createdAt).toEqual(expect.stringMatching(ISO8601_PATTERN));
      expect(() => new Date(todo.createdAt)).not.toThrow();
      expect(todo.updatedAt).toEqual(expect.stringMatching(ISO8601_PATTERN));
      expect(() => new Date(todo.updatedAt)).not.toThrow();
      expect(todo.createdAt).toEqual(todo.updatedAt);
    });
  });
  describe('toggle', () => {
    it('returns an instance of Todo that has inverse value of isDone', async () => {
      const todo = Todo.factory({ title: 'foo' });
      expect(todo.completedAt).toBeNull();

      await sleep(10);
      const toggled = Todo.toggle(todo);
      expect(toggled.completedAt).not.toBeNull();
      expect(toggled.createdAt).toBe(todo.createdAt);
      expect(new Date(toggled.updatedAt).getTime()).toBeGreaterThan(new Date(todo.updatedAt).getTime());

      await sleep(10);
      const undone = Todo.toggle(toggled);
      expect(undone.completedAt).toBeNull();
      expect(undone.createdAt).toBe(todo.createdAt);
      expect(new Date(undone.updatedAt).getTime()).toBeGreaterThan(new Date(toggled.updatedAt).getTime());
    });
  });
  describe('isDone', () => {
    it('returns true if Todo is completed', () => {
      const todo = Todo.factory({ title: 'todo' });
      expect(Todo.isDone(todo)).toBe(false);

      const doneTodo = Todo.toggle(todo);
      expect(Todo.isDone(doneTodo)).toBe(true);
    });
  });
  describe('change', () => {
    it('returns an instance of Todo model that have specified titles and details', async () => {
      const todo = Todo.factory({ title: 'org todo' });
      expect(todo.title).toBe('org todo');
      expect(todo.detail).toBeUndefined();

      await sleep(10);
      const changed = Todo.change(todo, {
        title: 'changed todo',
        detail: 'changed todo detail',
      });
      expect(changed.title).toBe('changed todo');
      expect(changed.detail).toBe('changed todo detail');
      expect(changed.createdAt).toBe(todo.createdAt);
      expect(new Date(changed.updatedAt).getTime()).toBeGreaterThan(new Date(changed.createdAt).getTime());
    });
  });
});
