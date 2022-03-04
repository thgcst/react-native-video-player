import React from 'react';
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
  const orientation = useOrientation();
  return (
    <Container>
      <WrapperVideo portrait={orientation === 'PORTRAIT'}>
        <Video
          source={{ uri: data.medias.url_hls }}
          thumbnail={data.thumbnail}
        />
      </WrapperVideo>
      <HideOnLandscape>
        <WrapperContent>
          <List>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <WrapperText first={index === 0} key={item}>
                <Text>{item}</Text>
              </WrapperText>
            ))}
          </List>
        </WrapperContent>
      </HideOnLandscape>
    </Container>
  );
};

export default Screens;
