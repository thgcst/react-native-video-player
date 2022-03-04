import React, { ElementRef, useRef, useState } from 'react';
import Video, { VideoProperties } from 'react-native-video';

import Controls from './Controls';
import VideoContext, {
  _isPlaying,
  _progress,
  _subtitles,
  _selectedSubtitle,
} from './VideoContext';

import { Container } from './styles';
import { useOrientation } from './hooks/useOrientation';

interface IVideoComponent {
  source: VideoProperties['source'];
  thumbnail: VideoProperties['poster'];
}

const VideoComponent: React.FC<IVideoComponent> = ({ source, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState<typeof _isPlaying>(_isPlaying);
  const [progress, setProgress] = useState<typeof _progress>(_progress);
  const [subtitles, setSubtitles] = useState<typeof _subtitles>(_subtitles);
  const [selectedSubtitle, setSelectedSubtitle] =
    useState<typeof _selectedSubtitle>(_selectedSubtitle);

  const videoRef = useRef<Video>(null);
  const controlsRef = useRef<ElementRef<typeof Controls>>(null);

  return (
    <VideoContext.Provider
      value={{
        isPlaying,
        progress,
        subtitles,
        selectedSubtitle,
      }}>
      <Container>
        <Video
          source={source}
          ref={videoRef}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '100%',
            height: '100%',
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
          onLoad={e => {
            setSubtitles(
              e.textTracks
                .filter(track => track.language)
                .map(track => ({
                  ...track,
                  title: track.title.replace('subs:', ''),
                })),
            );
            setProgress({
              currentTime: e.currentTime,
              seekableDuration: e.duration,
              playableDuration: 0,
            });
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
        <Controls
          ref={controlsRef}
          seekTo={e => videoRef.current?.seek(e)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          setSelectedSubtitle={setSelectedSubtitle}
        />
      </Container>
    </VideoContext.Provider>
  );
};

export default VideoComponent;
