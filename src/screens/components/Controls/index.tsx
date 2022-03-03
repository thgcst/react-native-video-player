import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'moti';

import {
  Clickable,
  Container,
  WrapperCenterButtons,
  ControlButton,
  ControlButtonText,
  Play,
  Pause,
  Rewind,
  FastForward,
  HiddenPlayPauseButton,
  WrapperSecondaryControls,
} from './styles';

interface IControls {
  onRewind: () => void;
  onPlay: () => void;
  onPause: () => void;
  onFastForward: () => void;
  isPlaying: boolean;
}

const Controls: React.FC<IControls> = ({
  onRewind,
  onPlay,
  onPause,
  onFastForward,
  isPlaying,
}) => {
  const TIME_TO_AUTO_HIDE = 5 * 1000; // 5 sec
  const [isVisible, setIsVisible] = useState(false);
  const controlTimeout = useRef<NodeJS.Timeout | null>(null);

  const setControlTimeout = () => {
    // controlTimeout.current = setTimeout(() => {
    //   setIsVisible(false);
    // }, TIME_TO_AUTO_HIDE);
  };

  const clearControlTimeout = () => {
    // if (controlTimeout.current) {
    //   clearTimeout(controlTimeout.current);
    // }
  };

  const resetControlTimeout = () => {
    // clearControlTimeout();
    // setControlTimeout();
  };

  return (
    <Clickable
      onPress={() => {
        if (isVisible) {
          clearControlTimeout();
        } else {
          setControlTimeout();
        }
        setIsVisible(e => !e);
      }}>
      <AnimatePresence>
        {isVisible && (
          <Container
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            exitTransition={{ type: 'timing', duration: 300 }}
            transition={{
              type: 'timing',
              duration: 200,
            }}>
            <WrapperSecondaryControls />
            <WrapperCenterButtons>
              <ControlButton
                onPress={() => {
                  resetControlTimeout();
                  onRewind();
                }}>
                <Rewind />
                <ControlButtonText>-10s</ControlButtonText>
              </ControlButton>
              <ControlButton
                onPress={() => {
                  resetControlTimeout();
                  if (isPlaying) {
                    onPause();
                  } else {
                    onPlay();
                  }
                }}>
                {isPlaying ? <Pause /> : <Play />}
              </ControlButton>
              <ControlButton
                onPress={() => {
                  resetControlTimeout();
                  onFastForward();
                }}>
                <FastForward />
                <ControlButtonText>+10s</ControlButtonText>
              </ControlButton>
            </WrapperCenterButtons>
            <WrapperSecondaryControls />
          </Container>
        )}
      </AnimatePresence>
      {!isVisible && (
        <HiddenPlayPauseButton
          onPress={() => {
            resetControlTimeout();
            if (isPlaying) {
              onPause();
            } else {
              onPlay();
            }
            setIsVisible(true);
          }}
        />
      )}
    </Clickable>
  );
};

export default Controls;
