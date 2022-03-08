import React, { ElementRef, useEffect, useRef, useState } from 'react';
import Video, { VideoProperties } from 'react-native-video';
import { StatusBar, Switch } from 'react-native';
import Orientation from 'react-native-orientation';
import {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';

import Controls from './Controls';
import VideoContext, {
  _isPlaying,
  _isLoading,
  _audioOnly,
  _progress,
  _subtitles,
  _selectedSubtitle,
} from './VideoContext';
import LoadingIndicator from './LoadingIndicator';

import { HideOnLandscape } from '../OrientationView';

import { Container, WrapperSwitch, SwitchText } from './styles';
import { useOrientation } from './hooks/useOrientation';
import { useMusicControl } from './hooks/useMusicControl';

interface IVideoComponent {
  source: VideoProperties['source'];
  audioSource: VideoProperties['source'];
  thumbnail: VideoProperties['poster'];
  title: string;
  artist: string;
  playOnMount?: boolean;
  startAt?: number;
}

const VideoComponent: React.FC<IVideoComponent> = ({
  source,
  audioSource,
  thumbnail,
  title,
  artist,
  playOnMount = false,
  startAt,
}) => {
  const [isPlaying, setIsPlaying] = useState<typeof _isPlaying>(playOnMount);
  const [isLoading, setIsLoading] = useState<typeof _isLoading>(_isLoading);
  const [audioOnly, setAudioOnly] = useState<typeof _audioOnly>(_audioOnly);
  const [progress, setProgress] = useState<typeof _progress>(_progress);
  const [previousCurrentTime, setPreviousCurrentTime] = useState<number | null>(
    null,
  );
  const [subtitles, setSubtitles] = useState<typeof _subtitles>(_subtitles);
  const [selectedSubtitle, setSelectedSubtitle] =
    useState<typeof _selectedSubtitle>(_selectedSubtitle);

  const videoRef = useRef<Video>(null);
  const controlsRef = useRef<ElementRef<typeof Controls>>(null);

  const orientation = useOrientation();

  const { setNowPlaying } = useMusicControl({
    isPlaying,
    playVideo: () => setIsPlaying(true),
    pauseVideo: () => setIsPlaying(false),
    seek: pos => videoRef.current?.seek(pos),
    currentTime: progress.currentTime,
  });

  const toggleAudioOnly = () => {
    setPreviousCurrentTime(progress.currentTime);

    if (audioOnly) {
      setAudioOnly(false);
      Orientation.unlockAllOrientations();
    } else {
      setAudioOnly(true);
      Orientation.lockToPortrait();
    }
  };

  useEffect(() => {
    if (orientation === 'PORTRAIT') {
      showNavigationBar();
    } else {
      hideNavigationBar();
    }
  }, [orientation]);

  return (
    <VideoContext.Provider
      value={{
        isPlaying,
        isLoading,
        audioOnly,
        progress,
        subtitles,
        selectedSubtitle,
      }}>
      <Container>
        <StatusBar hidden={orientation !== 'PORTRAIT'} />
        <Video
          source={audioOnly ? audioSource : source}
          ref={videoRef}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
          }}
          pictureInPicture
          ignoreSilentSwitch="ignore"
          allowsExternalPlayback
          playInBackground
          playWhenInactive
          poster={thumbnail}
          posterResizeMode="cover"
          controls={false}
          resizeMode="contain"
          paused={!isPlaying}
          onLoadStart={() => setIsLoading(true)}
          onLoad={e => {
            if (startAt) {
              videoRef.current?.seek(startAt);
            }
            setNowPlaying({
              title,
              thumbnail,
              artist,
              duration: e.duration,
            });
            setIsLoading(false);
            setSubtitles(e.textTracks);
            setProgress({
              currentTime: e.currentTime,
              seekableDuration: e.duration,
              playableDuration: 0,
            });
            if (previousCurrentTime) {
              videoRef.current?.seek(previousCurrentTime);
              setPreviousCurrentTime(null);
            }
          }}
          selectedTextTrack={selectedSubtitle}
          onSeek={e => {
            setProgress(previousValue => ({
              ...previousValue,
              currentTime: e.currentTime,
            }));
            controlsRef.current?.setIsSeeking?.(false);
          }}
          onProgress={e => {
            setProgress(e);
          }}
          progressUpdateInterval={1000}
        />
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <Controls
            ref={controlsRef}
            seekTo={e => videoRef.current?.seek(e)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            setSelectedSubtitle={setSelectedSubtitle}
          />
        )}
      </Container>
      <HideOnLandscape>
        <WrapperSwitch>
          <SwitchText>Somente áudio</SwitchText>
          <Switch
            ios_backgroundColor="#e0bf5a"
            value={audioOnly}
            onValueChange={toggleAudioOnly}
          />
        </WrapperSwitch>
      </HideOnLandscape>
    </VideoContext.Provider>
  );
};

export default VideoComponent;
