import { createContext } from 'react';

import {
  OnLoadData,
  OnProgressData,
  VideoProperties,
} from 'react-native-video';

export const _isPlaying = false as boolean;
export const _isLoading = false as boolean;
export const _audioOnly = false as boolean;
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
export const _source = { uri: '' };
export const _audioSource = { uri: '' };
export const _thumbnail = '' as string;
export const _title = '' as string;
export const _artist = '' as string;
export const _videoRate = 1 as number;

interface IInitialValue {
  isPlaying: typeof _isPlaying;
  isLoading: typeof _isLoading;
  audioOnly: typeof _audioOnly;
  progress: typeof _progress;
  subtitles: typeof _subtitles;
  selectedSubtitle: typeof _selectedSubtitle;
  source: VideoProperties['source'];
  audioSource: VideoProperties['source'];
  thumbnail: VideoProperties['poster'];
  title: string;
  artist: string;
  videoRate: typeof _videoRate;
}

const initialValue: IInitialValue = {
  isPlaying: _isPlaying,
  isLoading: _isLoading,
  audioOnly: _audioOnly,
  progress: _progress,
  subtitles: _subtitles,
  selectedSubtitle: _selectedSubtitle,
  source: _source,
  audioSource: _audioSource,
  thumbnail: _thumbnail,
  title: _title,
  artist: _artist,
  videoRate: _videoRate,
};

const VideoContext = createContext(initialValue);

export default VideoContext;
