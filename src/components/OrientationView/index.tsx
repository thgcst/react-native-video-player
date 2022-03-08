import React, { useState } from 'react';
import { useOrientationChange } from 'react-native-orientation-locker';

export const HideOnLandscape: React.FC = ({ children }) => {
  const [orientation, setOrientation] = useState('PORTRAIT');
  useOrientationChange(setOrientation);

  if (orientation === 'PORTRAIT') {
    return <>{children}</>;
  }

  return <></>;
};

export const HideOnPortrait: React.FC = ({ children }) => {
  const [orientation, setOrientation] = useState('PORTRAIT');
  useOrientationChange(setOrientation);

  if (orientation === 'PORTRAIT') {
    return <></>;
  }

  return <>{children}</>;
};
