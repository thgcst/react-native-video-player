import React, { useRef, useState } from 'react';
import Video, { OnProgressData } from 'react-native-video';
// import Slider from 'react-native-slider';

import Metrics from '~/theme/metrics';

import data from './data';
import Slider from './components/Slider';

import {
  Button,
  Container,
  WrapperButtons,
  WrapperVideo,
  TimeText,
} from './styles';
import Controls from './components/Controls';

const Screens: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<OnProgressData>({
    currentTime: 0,
    playableDuration: 0,
    seekableDuration: 0,
  });
  const videoRef = useRef<Video>(null);

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
          onProgress={e => {
            setProgress(e);
          }}
          progressUpdateInterval={1000}
        />
        <Controls
          onRewind={() => videoRef.current?.seek(progress.currentTime - 10)}
          onFastForward={() =>
            videoRef.current?.seek(progress.currentTime + 10)
          }
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          isPlaying={isPlaying}
        />
      </WrapperVideo>
      <WrapperButtons>
        <TimeText>
          {new Date(progress.currentTime * 1000).toISOString().substr(11, 8)}
        </TimeText>
        {/* <Slider
          value={progress.currentTime}
          minimumValue={0}
          maximumValue={progress.seekableDuration}
          // onSlidingStart={() => setIsPlaying(false)}
          onSlidingComplete={e => {
            videoRef.current?.seek(e);
            // setIsPlaying(true);
          }}
          style={{ flex: 1 }}
          // onValueChange={value => this.setState({ value })}
        /> */}
        <Slider />
      </WrapperButtons>
    </Container>
  );
};

export default Screens;
