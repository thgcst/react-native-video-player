import React, { ElementRef, useEffect, useRef, useState } from 'react';
import { StatusBar, Switch } from 'react-native';

import { useRemoteMediaClient } from 'react-native-google-cast';
import {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import Orientation from 'react-native-orientation-locker';
import Video, { VideoProperties } from 'react-native-video';

import useOrientation from '~/hooks/useOrientation';

import ChromeCastControls from './ChromeCastControls';
import Controls from './Controls';
import { useMusicControl } from './hooks/useMusicControl';
import LoadingIndicator from './LoadingIndicator';
import VideoContext, {
  _isPlaying,
  _isLoading,
  _audioOnly,
  _progress,
  _subtitles,
  _selectedSubtitle,
  _videoRate,
} from './VideoContext';

import { HideOnLandscape } from '../OrientationView';

import { Container, WrapperSwitch, SwitchText } from './styles';

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
  const [videoRate, setVideoRate] = useState<typeof _videoRate>(_videoRate);

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
      StatusBar.setHidden(false);
      showNavigationBar();
    } else {
      StatusBar.setHidden(true);
      hideNavigationBar();
    }
  }, [orientation]);

  const chromeCastClient = useRemoteMediaClient();

  return (
    <VideoContext.Provider
      value={{
        isPlaying,
        isLoading,
        audioOnly,
        progress,
        subtitles,
        selectedSubtitle,
        source,
        audioSource,
        thumbnail,
        title,
        artist,
        videoRate,
        startAt,
      }}>
      <Container>
        {chromeCastClient ? (
          <ChromeCastControls />
        ) : (
          <>
            <Video
              source={audioOnly ? audioSource : source}
              ref={videoRef}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
              }}
              pictureInPicture={false}
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
              rate={videoRate}
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
                setVideoRate={setVideoRate}
              />
            )}
          </>
        )}
      </Container>
      <HideOnLandscape>
        <WrapperSwitch>
          <SwitchText>Somente áudio</SwitchText>
          <Switch
            ios_backgroundColor="#e0bf5a"
            value={audioOnly}
            onValueChange={toggleAudioOnly}
            disabled={!!chromeCastClient}
          />
        </WrapperSwitch>
      </HideOnLandscape>
    </VideoContext.Provider>
  );
};

export default VideoComponent;
