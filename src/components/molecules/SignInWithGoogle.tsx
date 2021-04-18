import * as React from 'react';
import Button from '../atoms/Button';
import { Context, Status } from '../../contexts/ui';

const SignInWithGoogle = () => {
  const { setApplicationState } = React.useContext(Context);
  return <Button onPress={() => setApplicationState(Status.AUTHORIZED)} icon="google" label="Sign In with Google" />;
};

export default SignInWithGoogle;
