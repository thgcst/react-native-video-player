import React, { useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  OrientationLocker,
  useOrientationChange,
  UNLOCK,
} from 'react-native-orientation-locker';

import { HideOnLandscape } from '~/components/OrientationView';
import Video from '~/components/Video';
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
  const [orientation, setOrientation] = useState('PORTRAIT');

  useLayoutEffect(() => {
    setOptions({
      headerShown: orientation === 'PORTRAIT' || orientation === 'UNKNOWN',
      gestureEnabled: orientation === 'PORTRAIT' || orientation === 'UNKNOWN',
      title: selectedVideo.className,
    });
  }, [orientation]);

  useOrientationChange(setOrientation);

  return (
    <Container>
      <OrientationLocker orientation={UNLOCK} />
      <WrapperVideo
        portrait={orientation === 'PORTRAIT' || orientation === 'UNKNOWN'}>
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
