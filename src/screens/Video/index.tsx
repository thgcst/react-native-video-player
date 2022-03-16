import React, { useLayoutEffect, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OrientationLocker, UNLOCK } from 'react-native-orientation-locker';

import { HideOnLandscape } from '~/components/OrientationView';
import Video from '~/components/Video';
import useOrientation from '~/hooks/useOrientation';
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
  const { params: lesson } = useRoute<Props['route']>();
  const [selectedVideo, setSelectedVideo] = useState(lesson.portions[0]);
  const { setOptions } = useNavigation<Props['navigation']>();
  const orientation = useOrientation();

  useLayoutEffect(() => {
    setOptions({
      headerShown: orientation === 'PORTRAIT',
      gestureEnabled: orientation === 'PORTRAIT',
      title: lesson.description,
    });
  }, [orientation]);

  return (
    <Container>
      <OrientationLocker orientation={UNLOCK} />
      <WrapperVideo portrait={orientation === 'PORTRAIT'}>
        <Video
          source={{ uri: selectedVideo.medias.url_hls }}
          audioSource={{ uri: selectedVideo.medias.url_audio }}
          thumbnail={selectedVideo.thumbnail}
          title={`${selectedVideo.description} - ${selectedVideo.teacher}`}
          artist={selectedVideo.teacher}
          playOnMount
          startAt={selectedVideo.watchedSeconds}
        />
      </WrapperVideo>
      <HideOnLandscape>
        <WrapperContent>
          <List>
            {lesson.portions.map((item, index) => (
              <WrapperText
                first={index === 0}
                key={item.id}
                onPress={() => setSelectedVideo(item)}>
                <Text selected={selectedVideo.id === item.id}>
                  {item.description}
                </Text>
              </WrapperText>
            ))}
          </List>
        </WrapperContent>
      </HideOnLandscape>
    </Container>
  );
};

export default VideoScreen;
