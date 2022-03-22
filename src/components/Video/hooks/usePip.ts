import { useEffect, useLayoutEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import AndroidPip from 'react-native-android-pip';

// Hook for PiP state

export const usePiP = () => {
  const { setOptions } = useNavigation();
  const [pipActive, setPipActive] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const subscription = AppState.addEventListener('change', async state => {
        if (state === 'background') {
          setPipActive(true);
          AndroidPip.enterPictureInPictureMode();
        } else {
          setPipActive(false);
        }
      });
      return () => {
        subscription.remove();
      };
    }
    return () => {
      //
    };
  }, []);

  useLayoutEffect(() => {
    if (Platform.OS === 'android') {
      setOptions({
        headerShown: !pipActive,
      });
    }
  }, [pipActive]);

  return { pipActive };
};
