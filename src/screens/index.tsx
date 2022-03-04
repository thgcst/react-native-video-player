import React from 'react';

import Video from '~/components/Video';

import data from './data';

import { Container, WrapperVideo } from './styles';

const Screens: React.FC = () => {
  return (
    <Container>
      <WrapperVideo>
        <Video
          source={{ uri: data.medias.url_hls }}
          thumbnail={data.thumbnail}
        />
      </WrapperVideo>
    </Container>
  );
};

export default Screens;
