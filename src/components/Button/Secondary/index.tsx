import React from 'react';
import { GestureResponderEvent } from 'react-native';

import LoadingIndicator from '~/components/LoadingIndicator';

import { Container, Description } from './styles';

interface ButtonProps {
  width?: string;
  maxWidth?: string;
  onPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  margin?: string;
}
const SecondaryButton: React.FC<ButtonProps> = ({
  width = '100%',
  maxWidth = '100%',
  onPress,
  loading = false,
  disabled = false,
  margin = '10px 0',
  children = 'Children',
}) => (
  <Container
    width={width}
    maxWidth={maxWidth}
    onPress={onPress}
    disabled={disabled}
    margin={margin}>
    {loading ? (
      <LoadingIndicator />
    ) : (
      <>
        <Description>{children}</Description>
      </>
    )}
  </Container>
);

export default SecondaryButton;
