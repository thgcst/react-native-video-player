import { useState } from 'react';

import {
  OrientationType,
  useOrientationChange,
} from 'react-native-orientation-locker';

function useOrientation() {
  const [orientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE'>(
    'PORTRAIT',
  );

  const handler = (orientation: OrientationType) => {
    switch (orientation) {
      case 'PORTRAIT':
        setOrientation('PORTRAIT');
        break;
      case 'LANDSCAPE-LEFT':
        setOrientation('LANDSCAPE');
        break;
      case 'LANDSCAPE-RIGHT':
        setOrientation('LANDSCAPE');
        break;
      default:
        break;
    }
  };

  useOrientationChange(handler);

  return orientation;
}

export default useOrientation;
