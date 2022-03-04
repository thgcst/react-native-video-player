import React from 'react';

import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

const LoadingIndicator: React.FC = () => {
  return (
    <Container>
      <ActivityIndicator color="#e0bf5a" size="large" />
    </Container>
  );
};

export default LoadingIndicator;
