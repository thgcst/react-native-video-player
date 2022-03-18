/* eslint-disable react-native/no-inline-styles */

import React, { useContext, useEffect } from 'react';
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
    videoRate,
    selectedSubtitle,
  } = useContext(VideoContext);

  const client = useRemoteMediaClient();

  const sessionManager = GoogleCast.getSessionManager();

  useEffect(() => {
    if (client) {
      client.loadMedia({
        mediaInfo: {
          contentUrl:
            typeof source !== 'number' && source?.uri ? source.uri : '',
          metadata: {
            images: [
              {
                url: thumbnail || '',
              },
            ],
            title,
            type: 'generic',
            subtitle: selectedSubtitle?.value,
          },
          streamDuration: seekableDuration,
        },
        playbackRate: videoRate,
        startTime: currentTime,
      });
    }
  }, [client]);

  return (
    <>
      <Button
        title={client ? 'Stop' : 'Stream'}
        onPress={() =>
          client
            ? sessionManager.endCurrentSession()
            : GoogleCast.showCastDialog()
        }
      />
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
