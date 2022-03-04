import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  ElementRef,
  useContext,
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
  WrapperHeader,
  WrapperFooter,
  ClickableIcon,
  FullScreen,
  Subtitles,
} from './styles';
import Slider from '../Slider';
import VideoContext from '~/screens/VideoContext';
import SubtitlesMenu from '../SubtitlesMenu';

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
}

export interface ControlsRef {
  setIsSeeking?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls: React.ForwardRefRenderFunction<ControlsRef, IControls> = (
  { onPlay, onPause, seekTo, setSelectedSubtitle },
  ref,
) => {
  const TIME_TO_AUTO_HIDE = 5 * 1000; // 5 sec
  const {
    isPlaying,
    progress: { currentTime, playableDuration, seekableDuration },
  } = useContext(VideoContext);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const controlTimeout = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<ElementRef<typeof Slider>>(null);

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

  useImperativeHandle(ref, () => ({
    setIsSeeking: sliderRef.current?.setIsSeeking,
  }));

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
              }}>
              <WrapperHeader>
                <ClickableIcon onPress={() => setIsSubtitleVisible(true)}>
                  <Subtitles />
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
                />
                <ClickableIcon>
                  <FullScreen />
                </ClickableIcon>
              </WrapperFooter>
            </Container>
          )}
        </AnimatePresence>
        {!isControlsVisible && (
          <HiddenPlayPauseButton
            onPress={() => {
              resetControlTimeout();
              if (isPlaying) {
                onPause();
              } else {
                onPlay();
              }
              setIsControlsVisible(true);
            }}
          />
        )}
      </Clickable>
      <SubtitlesMenu
        isVisible={isSubtitleVisible}
        setSelectedSubtitle={e => {
          setSelectedSubtitle(e);
          setIsSubtitleVisible(false);
        }}
      />
    </>
  );
};

export default forwardRef(Controls);
