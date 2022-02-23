import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

const LoadingIndicator: React.FC<ActivityIndicatorProps> = ({
  size,
  color,
}) => <ActivityIndicator color={color} size={size} />;

LoadingIndicator.defaultProps = {
  color: '#FFF',
  size: 'small',
};

export default LoadingIndicator;
