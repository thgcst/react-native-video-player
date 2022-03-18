import React from 'react';

import useOrientation from '~/hooks/useOrientation';

export const HideOnLandscape: React.FC = ({ children }) => {
  const orientation = useOrientation();

  if (orientation === 'PORTRAIT') {
    return <>{children}</>;
  }

  return <></>;
};

export const HideOnPortrait: React.FC = ({ children }) => {
  const orientation = useOrientation();

  if (orientation === 'PORTRAIT') {
    return <></>;
  }

  return <>{children}</>;
};
