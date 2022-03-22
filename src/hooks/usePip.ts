import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AndroidPip from 'react-native-android-pip';

// Hook for PiP state

export const usePiP = (currentState: AppStateStatus) => {
  const [pipActive, setPipActive] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (state) => {
      if (state === 'background') {
        setPipActive(true);
        AndroidPip.enterPictureInPictureMode()
      } else {
        setPipActive(false);
      }
    })

    return () => {
      subscription.remove();
    };
  }, [currentState]);

  return { pipActive };
};
