import { useEffect, useState } from 'react';
import Orientation from 'react-native-orientation';

export function useOrientation() {
  const [orientation, setOrientation] =
    useState<Orientation.orientation>('PORTRAIT');

  useEffect(() => {
    const handleOrientation = (ev: Orientation.orientation) => {
      setOrientation(ev);
    };
    Orientation.addOrientationListener(handleOrientation);

    return () => Orientation.removeOrientationListener(handleOrientation);
  }, []);

  return orientation;
}
