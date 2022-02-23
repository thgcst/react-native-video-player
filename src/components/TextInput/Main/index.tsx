import React from 'react';
import { TextInputProps } from 'react-native';

import Colors from '~/theme/colors';

import {
  Container,
  WrapperInput,
  Input,
  WrapperError,
  ErrorText,
} from './styles';

interface ITextInput extends TextInputProps {
  touched?: boolean;
  error?: string;
}

const TextInput: React.FC<ITextInput> = ({ touched, error, ...rest }) => {
  const isError = Boolean(touched && error);

  return (
    <Container error={isError}>
      <WrapperInput>
        <Input
          {...rest}
          selectionColor={Colors.blue[300]}
          placeholderTextColor="#c2c7cc"
        />
      </WrapperInput>

      {isError && (
        <WrapperError>
          <ErrorText>{error}</ErrorText>
        </WrapperError>
      )}
    </Container>
  );
};

export default TextInput;
