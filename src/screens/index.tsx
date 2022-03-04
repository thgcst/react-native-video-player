import React, { ElementRef, useRef, useState } from 'react';
import Video, { OnProgressData } from 'react-native-video';

import Metrics from '~/theme/metrics';

import data from './data';
import Controls from './components/Controls';

import { Container, WrapperVideo } from './styles';

const Screens: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<OnProgressData>({
    currentTime: 0,
    playableDuration: 0,
    seekableDuration: 0,
  });
  const videoRef = useRef<Video>(null);
  const controlsRef = useRef<ElementRef<typeof Controls>>(null);

  return (
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
          playInBackground
          poster={data.thumbnail}
          controls={false}
          resizeMode="contain"
          paused={!isPlaying}
          onLoad={e => {
            setProgress({
              currentTime: e.currentTime,
              seekableDuration: e.duration,
              playableDuration: 0,
            });
          }}
          onSeek={() => {
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
          isPlaying={isPlaying}
          currentTime={progress.currentTime}
          playableDuration={progress.playableDuration}
          seekableDuration={progress.seekableDuration}
        />
      </WrapperVideo>
    </Container>
  );
};

export default Screens;
