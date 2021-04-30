import * as Selectors from './todos';

import * as Domain from '../domain/models';
import { createStore } from '../store';
import { add, toggle } from '../modules/todos';
import sleep from '../lib/sleep';

describe('todos selectors', () => {
  describe('getArray', () => {
    it('returns array of todos', () => {
      const store = createStore();
      store.dispatch(add(Domain.Todo.factory({ title: 'foo' })));
      store.dispatch(add(Domain.Todo.factory({ title: 'bar' })));
      const actual = Selectors.getArray(store.getState());
      expect(actual.length).toBe(2);
    });
  });
  describe('getTodos', () => {
    it('returns array of todos sorted by createdAt desc', async () => {
      const store = createStore();
      store.dispatch(add(Domain.Todo.factory({ title: 'foo' })));
      await sleep(10);
      store.dispatch(add(Domain.Todo.factory({ title: 'bar' })));

      const actual = Selectors.getTodos(store.getState());
      expect(actual.length).toBe(2);
      expect(actual[0].title).toBe('bar');
    });
  });
  describe('getCompletedAll', () => {
    it('returns array of completed todos ', async () => {
      const store = createStore();
      store.dispatch(add(Domain.Todo.factory({ title: 'foo' })));
      store.dispatch(add(Domain.Todo.factory({ title: 'bar' })));
      store.dispatch(toggle(Object.keys(store.getState().todos)[0]));
      const actual = Selectors.getCompletedAll(store.getState());
      expect(actual.length).toBe(1);
      expect(actual[0].title).toBe('foo');
    });
  });
  describe('getNumOfCompleted', () => {
    it('returns a number of completed todos', async () => {
      const store = createStore();
      store.dispatch(add(Domain.Todo.factory({ title: 'foo' })));
      store.dispatch(add(Domain.Todo.factory({ title: 'bar' })));
      store.dispatch(toggle(Object.keys(store.getState().todos)[0]));
      const actual = Selectors.getNumOfCompleted(store.getState());
      expect(actual).toBe(1);
    });
  });
  describe('getStatistics', () => {
    it('returns statistics of todos', () => {
      const store = createStore();
      store.dispatch(add(Domain.Todo.factory({ title: 'foo' })));
      store.dispatch(add(Domain.Todo.factory({ title: 'bar' })));
      store.dispatch(add(Domain.Todo.factory({ title: 'buz' })));
      store.dispatch(toggle(Object.keys(store.getState().todos)[0]));
      const actual = Selectors.getStatistics(store.getState());
      expect(actual.numOfAll).toBe(3);
      expect(actual.numOfCompleted).toBe(1);
      expect(actual.numOfUnCompleted).toBe(2);
      expect(actual.completedRatio).toBe(0.33);
      expect(actual.uncompletedRatio).toBe(0.67);
    });
  });
  describe('getHistories', () => {
    it('returns array of todos that is completed sorted by updatedAt desc', async () => {
      const store = createStore();
      store.dispatch(add(Domain.Todo.factory({ title: 'foo' })));
      store.dispatch(add(Domain.Todo.factory({ title: 'bar' })));
      store.dispatch(add(Domain.Todo.factory({ title: 'buz' })));
      store.dispatch(toggle(Object.keys(store.getState().todos)[1]));
      await sleep(10);
      store.dispatch(toggle(Object.keys(store.getState().todos)[0]));

      const actual = Selectors.getHistories(store.getState());
      console.log(actual);
      expect(actual.length).toBe(2);
      expect(actual[0].title).toBe('foo');
    });
  });
});
