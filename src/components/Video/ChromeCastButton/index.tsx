/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import GoogleCast, { CastButton } from 'react-native-google-cast';

import { ChromeCastOff, Clickable } from './styles';

const ChromeCastButton: React.FC = () => {
  return (
    <>
      <Clickable onPress={() => GoogleCast.showCastDialog()}>
        <ChromeCastOff />
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
