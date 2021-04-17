import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DETAIL, STATISTICS } from '../../constants/path';
import { Detail, Statistics } from '../../components/pages';
import { HeaderLeft, headerTintColor, headerStyle } from '../Header';
import { COLOR } from '../../constants/theme';

const Stack = createStackNavigator();

const StatisticsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={STATISTICS} screenOptions={{ cardStyle, headerTintColor, headerStyle }}>
      <Stack.Screen name={STATISTICS} component={Statistics} options={{ headerLeft: () => <HeaderLeft /> }} />
      <Stack.Screen name={DETAIL} component={Detail} />
    </Stack.Navigator>
  );
};

const cardStyle = {
  backgroundColor: COLOR.MAIN,
};

export default StatisticsNavigator;
