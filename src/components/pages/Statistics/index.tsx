import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Todos, { Todo, State as TodosState } from '../../organisms/Todos';
import ProgressPanel, { Statistic } from '../../molecules/ProgressPanel';
import { DETAIL } from '../../../constants/path';
import HeaderText from '../../atoms/HeaderText';

const styles = StyleSheet.create({
  headerTextContainer: {
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 0,
  },
});

const data = {
  statistics: {
    numOfCompleted: 10,
    numOfAll: 25,
    numOfUnCompleted: 15,
    completedRatio: 0.4,
    unCompletedRatio: 0.6,
  },
  histories: [
    {
      id: '1',
      title: 'Todo1',
      detail: 'Done',
      isDone: true,
    },
    {
      id: '2',
      title: 'Todo2',
      detail: 'Done',
      isDone: true,
    },
  ],
};

interface Props {
  statistics: Statistic;
  histories: TodosState;
}

const Header = (props: Props) => {
  return (
    <View>
      <ProgressPanel {...props.statistics} />
      <View style={styles.headerTextContainer}>
        <HeaderText text="History" />
      </View>
    </View>
  );
};

const Statistics = () => {
  const { navigate } = useNavigation();
  const gotoDetail = React.useCallback(
    (state: Todo.State, isEditable: boolean) => {
      console.log({
        isEditable,
      });
      navigate(DETAIL, { ...state, isEditable });
    },
    [navigate],
  );
  const actions = React.useMemo(() => ({ gotoDetail }), [gotoDetail]);
  return <Todos isEditable={false} todos={data.histories} actions={actions} header={<Header {...data} />} />;
};

export default Statistics;
