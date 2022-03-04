import React, { ElementRef, useRef, useState } from 'react';
import Video from 'react-native-video';

import Metrics from '~/theme/metrics';

import data from './data';
import Controls from './components/Controls';
import VideoContext, {
  _isPlaying,
  _progress,
  _subtitles,
  _selectedSubtitle,
} from './VideoContext';

import { Container, WrapperVideo } from './styles';

const Screens: React.FC = () => {
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
        <WrapperVideo>
          <Video
            source={{ uri: data.medias.url_hls }}
            ref={videoRef}
            style={{
              width: Metrics.screenWidth,
              height: (Metrics.screenWidth * 9) / 16,
            }}
            pictureInPicture
            ignoreSilentSwitch="ignore"
            allowsExternalPlayback
            playInBackground
            playWhenInactive
            poster={data.thumbnail}
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
        </WrapperVideo>
      </Container>
    </VideoContext.Provider>
  );
};

export default Screens;
