import React, { useState } from 'react';
import { HideOnLandscape } from '~/components/OrientationView';

import Video from '~/components/Video';
import { useOrientation } from '~/components/Video/hooks/useOrientation';

import data from './data';

import {
  Container,
  WrapperVideo,
  WrapperContent,
  List,
  WrapperText,
  Text,
} from './styles';

const Screens: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState(data[0]);
  const orientation = useOrientation();
  return (
    <Container>
      <WrapperVideo portrait={orientation === 'PORTRAIT'}>
        <Video
          source={{ uri: selectedVideo.medias.url_hls }}
          audioSource={{ uri: selectedVideo.medias.url_audio }}
          thumbnail={selectedVideo.thumbnail}
        />
      </WrapperVideo>
      <HideOnLandscape>
        <WrapperContent>
          <List>
            {data.map((item, index) => (
              <WrapperText
                first={index === 0}
                key={item.id}
                onPress={() => setSelectedVideo(item)}>
                <Text selected={selectedVideo.id === item.id}>
                  {item.teacher}
                </Text>
              </WrapperText>
            ))}
          </List>
        </WrapperContent>
      </HideOnLandscape>
    </Container>
  );
};

export default Screens;
