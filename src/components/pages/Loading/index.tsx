import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as UiContext from '../../../contexts/ui';
import { COLOR } from '../../../constants/theme';

const ChangeStateButton = (props: { state: UiContext.Status }) => {
  const { setApplicationState } = React.useContext(UiContext.Context);
  const { state } = props;
  return (
    <TouchableOpacity onPress={() => setApplicationState(state)}>
      <Text style={styles.text}>Change State to {state}</Text>
    </TouchableOpacity>
  );
};

const Loading = () => {
  return (
    <View style={styles.container}>
      <ChangeStateButton state={UiContext.Status.AUTHORIZED} />
      <ChangeStateButton state={UiContext.Status.UN_AUTHORIZED} />
      <ChangeStateButton state={UiContext.Status.FIRST_OPEN} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.MAIN,
  },
  text: {
    color: COLOR.WHITE,
  },
});

export default Loading;
