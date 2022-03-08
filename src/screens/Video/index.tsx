import React, { useLayoutEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

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
  type Props = NativeStackScreenProps<RootStackParamList, 'VIDEO'>;
  const { params: selectedVideo } = useRoute<Props['route']>();
  const { setOptions } = useNavigation<Props['navigation']>();
  const orientation = useOrientation();

  useLayoutEffect(() => {
    setOptions({
      headerShown: orientation === 'PORTRAIT',
      gestureEnabled: orientation === 'PORTRAIT',
      title: selectedVideo.className,
    });
  }, [orientation]);

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
