import { useState, useRef } from 'react';

import Orientation, {
  OrientationType,
  useOrientationChange,
} from 'react-native-orientation-locker';

function useOrientation() {
  const [orientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE'>(
    'PORTRAIT',
  );
  const previousState = useRef<
    'PORTRAIT' | 'LANDSCAPE-LEFT' | 'LANDSCAPE-RIGHT'
  >('PORTRAIT');

  const handler = (o: OrientationType) => {
    switch (o) {
      case 'PORTRAIT':
        setOrientation('PORTRAIT');
        previousState.current = 'PORTRAIT';
        break;
      case 'LANDSCAPE-LEFT':
        setOrientation('LANDSCAPE');
        previousState.current = 'LANDSCAPE-LEFT';
        break;
      case 'LANDSCAPE-RIGHT':
        setOrientation('LANDSCAPE');
        previousState.current = 'LANDSCAPE-RIGHT';
        break;
      default:
        if (previousState.current === 'PORTRAIT') {
          Orientation.lockToPortrait();
        }
        if (previousState.current === 'LANDSCAPE-LEFT') {
          Orientation.lockToLandscapeLeft();
        }
        if (previousState.current === 'LANDSCAPE-RIGHT') {
          Orientation.lockToLandscapeRight();
        }
        break;
    }
  };

  useOrientationChange(handler);

  return orientation;
}

export default useOrientation;
