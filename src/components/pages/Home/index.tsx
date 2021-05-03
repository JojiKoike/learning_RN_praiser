import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Todos, { Todo, State as TodosState } from '../../organisms/Todos';
import { COLOR } from '../../../constants/theme';
import { DETAIL, INPUT } from '../../../constants/path';
import testIDs from '../../../constants/testIDs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 48,
    height: 48,
    backgroundColor: COLOR.MAIN_DARK,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});

/*
const todos = [
  {
    id: '1',
    title: 'Todo',
    detail: 'to do',
    isDone: false,
  },
  {
    id: '2',
    title: 'Done',
    detail: 'done task',
    isDone: true,
  },
];
*/

interface Props {
  todos: TodosState;
  actions: {
    toggleTodo: Todo.DoneButton.ToggleTodo;
    removeTodo: Todo.DeleteButton.RemoveTodo;
  };
}

const Home = (props: Props) => {
  const { navigate } = useNavigation();
  const onPress = React.useCallback(() => {
    navigate(INPUT);
  }, [navigate]);
  const gotoDetail = React.useCallback(
    (state: Todo.State, isEditable: boolean) => {
      navigate(DETAIL, { ...state, isEditable });
    },
    [navigate],
  );
  const actions = React.useMemo(
    () => ({
      ...props.actions,
      gotoDetail,
    }),
    [gotoDetail, props.actions],
  );
  return (
    <View style={styles.container} testID={testIDs.HOME}>
      <Todos isEditable todos={props.todos} actions={{ ...actions, gotoDetail }} />
      <TouchableOpacity onPress={onPress} style={styles.button} testID={testIDs.TODO_OPEN_INPUT_BUTTON}>
        <Icon color={COLOR.PRIMARY} size={24} name="plus" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
