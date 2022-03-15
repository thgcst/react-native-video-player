import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  ElementRef,
  useContext,
  useEffect,
} from 'react';
import { AnimatePresence } from 'moti';
import Orientation, {
  useDeviceOrientationChange,
} from 'react-native-orientation-locker';

import useOrientation from '~/hooks/useOrientation';

import Slider from '../Slider';
import VideoContext from '../VideoContext';
import SubtitlesMenu from '../SubtitlesMenu';
import ConfigMenu from '../ConfigMenu';

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
  WrapperHeader,
  WrapperFooter,
  ClickableIcon,
  FullScreen,
  Subtitles,
  Config,
} from './styles';

interface IControls {
  onPlay: () => void;
  onPause: () => void;
  seekTo: (value: number) => void;
  setSelectedSubtitle: React.Dispatch<
    React.SetStateAction<
      | {
          type: 'title';
          value: string;
        }
      | undefined
    >
  >;
  setVideoRate: React.Dispatch<React.SetStateAction<number>>;
}

export interface ControlsRef {
  setIsSeeking?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls: React.ForwardRefRenderFunction<ControlsRef, IControls> = (
  { onPlay, onPause, seekTo, setSelectedSubtitle, setVideoRate },
  ref,
) => {
  const TIME_TO_AUTO_HIDE = 10 * 1000; // 10 seconds
  const {
    isPlaying,
    progress: { currentTime, playableDuration, seekableDuration },
    audioOnly,
  } = useContext(VideoContext);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const [isConfigVisible, setIsConfigVisible] = useState(false);
  const controlTimeout = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<ElementRef<typeof Slider>>(null);
  const orientation = useOrientation();

  const setControlTimeout = () => {
    controlTimeout.current = setTimeout(() => {
      setIsControlsVisible(false);
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

  useEffect(() => {
    return () => clearControlTimeout();
  }, []);

  useImperativeHandle(ref, () => ({
    setIsSeeking: sliderRef.current?.setIsSeeking,
  }));

  const toggleFullScreen = () => {
    if (orientation === 'PORTRAIT') {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

  useDeviceOrientationChange(() => {
    Orientation.unlockAllOrientations();
  });

  return (
    <>
      <Clickable
        onPress={() => {
          if (isControlsVisible) {
            clearControlTimeout();
          } else {
            setControlTimeout();
          }
          setIsControlsVisible(e => !e);
        }}>
        <AnimatePresence>
          {isControlsVisible && (
            <Container
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              exitTransition={{ type: 'timing', duration: 300 }}
              transition={{
                type: 'timing',
                duration: 200,
              }}
              portrait={orientation === 'PORTRAIT'}>
              <WrapperHeader>
                <ClickableIcon
                  disabled={audioOnly}
                  onPress={() => setIsSubtitleVisible(true)}>
                  {!audioOnly && <Subtitles />}
                </ClickableIcon>
                <ClickableIcon onPress={() => setIsConfigVisible(true)}>
                  <Config />
                </ClickableIcon>
              </WrapperHeader>
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
              <WrapperFooter>
                <Slider
                  ref={sliderRef}
                  value={currentTime}
                  loadedValue={playableDuration}
                  maxValue={seekableDuration}
                  onChangeValue={seekTo}
                  onSeeking={isSeeking => {
                    if (isSeeking) {
                      clearControlTimeout();
                    } else {
                      resetControlTimeout();
                    }
                  }}
                />
                <ClickableIcon disabled={audioOnly} onPress={toggleFullScreen}>
                  {!audioOnly && (
                    <FullScreen isFullscreen={orientation !== 'PORTRAIT'} />
                  )}
                </ClickableIcon>
              </WrapperFooter>
            </Container>
          )}
        </AnimatePresence>
      </Clickable>
      <SubtitlesMenu
        isVisible={isSubtitleVisible}
        setSelectedSubtitle={e => {
          setSelectedSubtitle(e);
          setTimeout(() => setIsSubtitleVisible(false), 100);
        }}
        closeMenu={() => setIsSubtitleVisible(false)}
      />
      <ConfigMenu
        isVisible={isConfigVisible}
        setVideoRate={e => {
          setVideoRate(e);
          setTimeout(() => setIsConfigVisible(false), 100);
        }}
        closeMenu={() => setIsConfigVisible(false)}
      />
    </>
  );
};

export default forwardRef(Controls);
