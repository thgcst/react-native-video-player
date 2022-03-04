import { createContext } from 'react';
import { OnLoadData, OnProgressData } from 'react-native-video';

export const _isPlaying = false as boolean;
export const _progress: OnProgressData = {
  currentTime: 0,
  playableDuration: 0,
  seekableDuration: 0,
};
export const _subtitles: OnLoadData['textTracks'] = [];
export const _selectedSubtitle = undefined as
  | {
      type: 'title';
      value: string;
    }
  | undefined;

interface IInitialValue {
  isPlaying: typeof _isPlaying;
  progress: typeof _progress;
  subtitles: typeof _subtitles;
  selectedSubtitle: typeof _selectedSubtitle;
}

const initialValue: IInitialValue = {
  isPlaying: _isPlaying,
  progress: _progress,
  subtitles: _subtitles,
  selectedSubtitle: _selectedSubtitle,
};

const VideoContext = createContext(initialValue);

export default VideoContext;
