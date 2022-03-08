import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

import { HideOnLandscape } from '~/components/OrientationView';
import Video from '~/components/Video';
import { useOrientation } from '~/components/Video/hooks/useOrientation';
import { RootStackParamList } from '~/navigation';

import {
  Container,
  WrapperVideo,
  WrapperContent,
  List,
  WrapperText,
  Text,
} from './styles';

const VideoScreen: React.FC = () => {
  type VideoScreenRouteProp = RouteProp<RootStackParamList, 'VIDEO'>;
  const { params: selectedVideo } = useRoute<VideoScreenRouteProp>();
  const orientation = useOrientation();
  return (
    <Container>
      <WrapperVideo portrait={orientation === 'PORTRAIT'}>
        <Video
          source={{ uri: selectedVideo.medias.url_hls }}
          audioSource={{ uri: selectedVideo.medias.url_audio }}
          thumbnail={selectedVideo.thumbnail}
          title={`${selectedVideo.className} - ${selectedVideo.description}`}
          artist={selectedVideo.teacher}
          playOnMount
          startAt={selectedVideo.watchedSeconds}
        />
      </WrapperVideo>
      <HideOnLandscape>
        <WrapperContent>
          <List>
            {['Parte 1', 'Parte 2', 'Parte 3'].map((item, index) => (
              <WrapperText first={index === 0} key={item}>
                <Text selected={index === 0}>{item}</Text>
              </WrapperText>
            ))}
          </List>
        </WrapperContent>
      </HideOnLandscape>
    </Container>
  );
};

export default VideoScreen;
