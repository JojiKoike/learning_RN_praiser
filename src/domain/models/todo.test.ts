import * as Todo from './todo';

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
});
