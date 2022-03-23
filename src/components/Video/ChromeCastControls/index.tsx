import React, { useContext, useEffect } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import GoogleCast, {
  useRemoteMediaClient,
  useCastDevice,
} from 'react-native-google-cast';

import VideoContext from '../VideoContext';

import { Container, ChromeCastOn, Description } from './styles';

export interface ControlsRef {
  setIsSeeking?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls: React.FC = () => {
  const {
    source,
    thumbnail,
    title,
    progress: { currentTime, seekableDuration },
    startAt,
  } = useContext(VideoContext);

  const client = useRemoteMediaClient();
  const sessionManager = GoogleCast.getSessionManager();
  const device = useCastDevice();

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
          },
          streamDuration: seekableDuration,
        },
        startTime: currentTime,
      });
    }
  }, [client]);

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
          },
          streamDuration: seekableDuration,
        },
        startTime: startAt || 0,
      });
    }
  }, [source]);

  useFocusEffect(
    React.useCallback(() => {
      return sessionManager.endCurrentSession;
    }, []),
  );

  return (
    <Container onPress={GoogleCast.showExpandedControls}>
      <ChromeCastOn />
      <Description>Conectado ao dispositivo {device?.friendlyName}</Description>
    </Container>
  );
};

export default Controls;
