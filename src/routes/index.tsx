import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRoutes from './Main';

const LoggingRoutes = () => {
  return (
    <NavigationContainer>
      <MainRoutes />
    </NavigationContainer>
  );
};

export default LoggingRoutes;
