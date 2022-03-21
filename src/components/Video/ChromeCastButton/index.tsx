/* eslint-disable react-native/no-inline-styles */

import React, { useContext, useEffect } from 'react';

import GoogleCast, {
  CastButton,
  useRemoteMediaClient,
} from 'react-native-google-cast';

import VideoContext from '../VideoContext';

import { ChromeCastOff, ChromeCastOn, Clickable } from './styles';

const ChromeCastButton: React.FC = () => {
  const {
    source,
    thumbnail,
    title,
    progress: { currentTime, seekableDuration },
    videoRate,
    selectedSubtitle,
    startAt,
  } = useContext(VideoContext);

  const client = useRemoteMediaClient();

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
        startTime: startAt || 0,
      });
    }
  }, [source]);

  return (
    <>
      <Clickable onPress={() => GoogleCast.showCastDialog()}>
        {client ? <ChromeCastOn /> : <ChromeCastOff />}
      </Clickable>
      <CastButton
        style={{
          width: 1,
          height: 1,
          tintColor: 'transparent',
          position: 'absolute',
          display: 'none',
        }}
      />
    </>
  );
};

export default ChromeCastButton;
