import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

import Colors from '~/theme/colors';

import {
  Container,
  WrapperInput,
  Input,
  WrapperError,
  ErrorText,
  WrapperShow,
  ShowText,
} from './styles';

interface IPasswordInput extends TextInputProps {
  touched?: boolean;
  error?: string;
}

const PasswordInput: React.FC<IPasswordInput> = ({
  touched,
  error,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const isError = Boolean(touched && error);

  return (
    <Container error={isError}>
      <WrapperInput>
        <Input
          {...rest}
          selectionColor={Colors.blue[300]}
          placeholderTextColor="#c2c7cc"
          secureTextEntry={showPassword}
        />
        <WrapperShow onPress={() => setShowPassword(e => !e)}>
          <ShowText>Mostrar</ShowText>
        </WrapperShow>
      </WrapperInput>

      {isError && (
        <WrapperError>
          <ErrorText>{error}</ErrorText>
        </WrapperError>
      )}
    </Container>
  );
};

export default PasswordInput;
