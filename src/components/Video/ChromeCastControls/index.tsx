import React, {
  useState,
  useRef,
  ElementRef,
  useContext,
  useEffect,
} from 'react';

import { useFocusEffect } from '@react-navigation/native';
import GoogleCast, { useRemoteMediaClient } from 'react-native-google-cast';
import { OrientationLocker } from 'react-native-orientation-locker';

import ChromeCastButton from '../ChromeCastButton';
import ConfigMenu from '../ConfigMenu';
import Slider from '../Slider';
import SubtitlesMenu from '../SubtitlesMenu';
import VideoContext from '../VideoContext';

import {
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
  Config,
} from './styles';

interface IControls {
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
  setCurrentTime: (time: number) => void;
}

export interface ControlsRef {
  setIsSeeking?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls: React.FC<IControls> = ({
  setSelectedSubtitle,
  setVideoRate,
  setCurrentTime,
}) => {
  const {
    progress: { playableDuration, seekableDuration },
    videoRate,
  } = useContext(VideoContext);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentCastTime, setCurrentCastTime] = useState(0);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const [isConfigVisible, setIsConfigVisible] = useState(false);

  const sliderRef = useRef<ElementRef<typeof Slider>>(null);

  const chromeCastClient = useRemoteMediaClient();
  const sessionManager = GoogleCast.getSessionManager();

  const onPlay = async () => {
    await chromeCastClient?.play();
    setIsPlaying(true);
  };

  const onPause = async () => {
    await chromeCastClient?.pause();
    setIsPlaying(false);
  };

  const seekTo = async (position: number) => {
    await chromeCastClient?.seek({ position });
    setTimeout(() => {
      sliderRef.current?.setIsSeeking(false);
    }, 500);
  };

  useEffect(() => {
    chromeCastClient?.setPlaybackRate(videoRate);
  }, [videoRate]);

  useEffect(() => {
    const progressListener = chromeCastClient?.onMediaProgressUpdated(e => {
      setCurrentCastTime(e);
    });

    const statusListener = chromeCastClient?.onMediaStatusUpdated(e => {
      if (e?.playerState === 'playing') {
        setIsPlaying(true);
      }
      if (e?.playerState === 'paused') {
        setIsPlaying(false);
      }
    });

    return () => {
      progressListener?.remove();
      statusListener?.remove();
      setCurrentTime(currentCastTime);
    };
  }, [chromeCastClient]);

  useFocusEffect(
    React.useCallback(() => {
      return sessionManager.endCurrentSession;
    }, []),
  );

  return (
    <>
      <Container>
        <OrientationLocker orientation="PORTRAIT" />
        <WrapperHeader>
          <ChromeCastButton />
          <ClickableIcon onPress={() => setIsConfigVisible(true)}>
            <Config />
          </ClickableIcon>
        </WrapperHeader>
        <WrapperCenterButtons>
          <ControlButton
            onPress={() => {
              seekTo(currentCastTime - 10);
            }}>
            <Rewind />
            <ControlButtonText>-10s</ControlButtonText>
          </ControlButton>
          <ControlButton
            onPress={() => {
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
              seekTo(currentCastTime + 10);
            }}>
            <FastForward />
            <ControlButtonText>+10s</ControlButtonText>
          </ControlButton>
        </WrapperCenterButtons>
        <WrapperFooter>
          <Slider
            ref={sliderRef}
            value={currentCastTime}
            loadedValue={playableDuration}
            maxValue={seekableDuration}
            onChangeValue={seekTo}
          />
        </WrapperFooter>
      </Container>

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

export default Controls;
