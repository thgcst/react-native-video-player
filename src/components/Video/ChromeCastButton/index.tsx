/* eslint-disable react-native/no-inline-styles */

import React, { useContext } from 'react';
import { Button } from 'react-native';

import GoogleCast, {
  CastButton,
  useRemoteMediaClient,
} from 'react-native-google-cast';

import VideoContext from '../VideoContext';

const ChromeCastButton: React.FC = () => {
  const {
    source,
    thumbnail,
    title,
    progress: { currentTime, seekableDuration },
  } = useContext(VideoContext);

  const client = useRemoteMediaClient();

  if (client) {
    client.loadMedia({
      mediaInfo: {
        contentUrl: typeof source !== 'number' && source?.uri ? source.uri : '',
        metadata: {
          images: [
            {
              url: thumbnail || '',
            },
          ],
          title,
          type: 'generic',
        },
        streamDuration: seekableDuration,
      },
      startTime: currentTime,
    });
    GoogleCast.showExpandedControls();
  }

  return (
    <>
      <Button title="Stream" onPress={GoogleCast.showCastDialog} />
      <CastButton
        style={{
          width: 24,
          height: 24,
          tintColor: 'black',
          display: 'none',
        }}
      />
    </>
  );
};

export default ChromeCastButton;
