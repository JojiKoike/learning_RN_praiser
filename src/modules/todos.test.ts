import { Todo, Todos } from '../domain/models';
import reducer, {
  Action,
  SET,
  set,
  ADD,
  add,
  UPDATE,
  update,
  REMOVE,
  remove,
  TOGGLE,
  toggle,
  createInitialState,
} from './todos';

describe('todos', () => {
  describe('action', () => {
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
        const action = remove('46');
        expect(action.type).toBe(REMOVE);
        expect(action.payload.id).toBe('46');
      });
    });
    describe('toggle', () => {
      it('returns an Action to tell the reducer "toggle todo"', () => {
        const action = toggle('48');
        expect(action.type).toBe(TOGGLE);
        expect(action.payload.id).toBe('48');
      });
    });
  });
  describe('reducer', () => {
    describe('set Action', () => {
      it('returns a new state that has payload of "set action"', () => {
        const action = set(Todos.factory([{ title: 'foo', detail: 'bar' }, { title: 'buz' }]));
        const setState = reducer(undefined, action);
        expect(Todos.getNumOf(setState)).toBe(2);
      });
    });
    describe('add Action', () => {
      it('returns a new state that has added new todo', () => {
        const action = add(Todo.factory({ title: 'foo', detail: 'bar' }));
        const addState = reducer(undefined, action);
        expect(Todos.getNumOf(addState)).toBe(1);
        const [id] = Object.keys(addState);
        const addedTodo = addState[id];
        expect(addedTodo.title).toBe('foo');
        expect(addedTodo.detail).toBe('bar');
      });
    });
    describe('update Action', () => {
      it('returns a new state that has updated todo item', () => {
        const setAction = set(Todos.factory([{ title: 'foo', detail: 'bar' }]));
        const initialState = reducer(undefined, setAction);

        const [id] = Object.keys(initialState);
        const updateAction = update(id, { title: 'hello', detail: undefined });
        const updateState = reducer(initialState, updateAction);
        expect(updateState[id].title).toBe('hello');
        expect(updateState[id].detail).toBeUndefined();
      });
    });
    describe('remove Action', () => {
      it('returns a new state that todo item has been removed by remove action', () => {
        const setAction = set(
          Todos.factory([
            { title: 'foo', detail: 'bar' },
            { title: 'hello', detail: 'world' },
          ]),
        );
        const initialState = reducer(undefined, setAction);

        const [id] = Object.keys(initialState);
        const removeAction = remove(id);
        const removedState = reducer(initialState, removeAction);
        expect(Todos.getNumOf(removedState)).toBe(1);
        expect(id in removedState).toBe(false);
      });
    });
    describe('toggle Action', () => {
      it('returns a new state that has toggled todo item by toggle action', () => {
        const setAction = set(Todos.factory([{ title: 'foo', detail: 'bar' }]));
        const initialState = reducer(undefined, setAction);

        const [id] = Object.keys(initialState);
        const toggleAction = toggle(id);
        const toggledState = reducer(initialState, toggleAction);

        const toggledTodo = toggledState[id];
        expect(Todo.isDone(toggledTodo)).toBe(true);
      });
    });
    describe('unknown Action', () => {
      it('returns unchanged state', () => {
        const action = ({ type: 'unknown' } as unknown) as Action;
        const initialState = createInitialState();
        const state = reducer(initialState, action);
        expect(state).toBe(initialState);
      });
    });
  });
});
