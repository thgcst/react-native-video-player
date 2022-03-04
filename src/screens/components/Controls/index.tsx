import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  ElementRef,
} from 'react';
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
  FullScreen,
} from './styles';
import Slider from '../Slider';

interface IControls {
  onPlay: () => void;
  onPause: () => void;

  isPlaying: boolean;
  currentTime: number;
  playableDuration: number;
  seekableDuration: number;
  seekTo: (value: number) => void;
}

export interface ControlsRef {
  setIsSeeking?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls: React.ForwardRefRenderFunction<ControlsRef, IControls> = (
  {
    onPlay,
    onPause,
    isPlaying,
    currentTime,
    playableDuration,
    seekableDuration,
    seekTo,
  },
  ref,
) => {
  const TIME_TO_AUTO_HIDE = 5 * 1000; // 5 sec
  const [isVisible, setIsVisible] = useState(true);
  const controlTimeout = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<ElementRef<typeof Slider>>(null);

  const setControlTimeout = () => {
    controlTimeout.current = setTimeout(() => {
      setIsVisible(false);
    }, TIME_TO_AUTO_HIDE);
  };

  const clearControlTimeout = () => {
    if (controlTimeout.current) {
      clearTimeout(controlTimeout.current);
    }
  };

  const resetControlTimeout = () => {
    clearControlTimeout();
    setControlTimeout();
  };

  useImperativeHandle(ref, () => ({
    setIsSeeking: sliderRef.current?.setIsSeeking,
  }));

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
                  seekTo(currentTime - 10);
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
                  seekTo(currentTime + 10);
                }}>
                <FastForward />
                <ControlButtonText>+10s</ControlButtonText>
              </ControlButton>
            </WrapperCenterButtons>
            <WrapperSecondaryControls>
              <Slider
                ref={sliderRef}
                value={currentTime}
                loadedValue={playableDuration}
                maxValue={seekableDuration}
                onChangeValue={seekTo}
              />
              <FullScreen />
            </WrapperSecondaryControls>
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

export default forwardRef(Controls);
