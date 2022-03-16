import { useEffect } from 'react';
import { Platform } from 'react-native';

import MusicControl, { Command } from 'react-native-music-control';

interface UseMusicControlProps {
  isPlaying: boolean;
  playVideo: () => void;
  pauseVideo: () => void;
  seek: (position: number) => void;
  currentTime: number;
}

export function useMusicControl({
  isPlaying,
  playVideo,
  pauseVideo,
  seek,
  currentTime,
}: UseMusicControlProps) {
  useEffect(() => {
    MusicControl.enableBackgroundMode(true);
    if (Platform.OS === 'ios') {
      MusicControl.handleAudioInterruptions(true);
    }

    // Basic Controls
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('stop', false);
    MusicControl.enableControl('nextTrack', false);
    MusicControl.enableControl('previousTrack', false);
    MusicControl.enableControl('changePlaybackPosition', true);

    MusicControl.enableControl('seekBackward', false);
    MusicControl.enableControl('seekForward', false);
    MusicControl.enableControl('seek', false);
    MusicControl.enableControl('skipBackward', true, { interval: 10 });
    MusicControl.enableControl('skipForward', true, { interval: 10 });

    MusicControl.enableControl('volume', false);
    MusicControl.enableControl('remoteVolume', false);

    MusicControl.enableControl('enableLanguageOption', false);
    MusicControl.enableControl('disableLanguageOption', false);

    MusicControl.enableControl('closeNotification', true, { when: 'never' });

    MusicControl.on(Command.play, () => {
      playVideo();
    });

    MusicControl.on(Command.pause, () => {
      pauseVideo();
    });

    MusicControl.on(Command.changePlaybackPosition, pos => {
      seek(pos);
    });

    return () => {
      MusicControl.resetNowPlaying();
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING,
      });
    } else {
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    MusicControl.updatePlayback({
      elapsedTime: currentTime,
    });

    MusicControl.on(Command.skipForward, () => {
      seek(currentTime + 10);
    });

    MusicControl.on(Command.skipBackward, () => {
      seek(currentTime - 10);
    });
  }, [currentTime]);

  interface SetNowPlayingProps {
    title: string;
    thumbnail?: string;
    artist: string;
    duration: number;
  }

  const setNowPlaying = ({
    title,
    thumbnail,
    artist,
    duration,
  }: SetNowPlayingProps) =>
    MusicControl.setNowPlaying({
      title,
      artwork: thumbnail,
      artist,
      duration,
    });

  return { setNowPlaying };
}
