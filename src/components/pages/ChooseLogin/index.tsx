import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Logo } from '../../atoms';
import { SIGN_IN, SIGN_UP } from '../../../constants/path';
import { COLOR } from '../../../constants/theme';

const ChooseLogin = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Logo />
      </View>
      <View style={styles.contentContainer}>
        <Button onPress={() => navigate(SIGN_IN)} style={styles.button} label="Sign In" />
        <Button onPress={() => navigate(SIGN_UP)} style={styles.button} label="Sign Up" />
      </View>
    </View>
  );
};

const padding = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.MAIN,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    paddingVertical: padding,
  },
  button: {
    marginBottom: 40,
    width: 300,
  },
});

export default ChooseLogin;
