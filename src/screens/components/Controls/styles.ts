import styled from 'styled-components/native';
import { MotiView } from 'moti';

import RewindIcon from '~/assets/icons/player/rewind.svg';
import PauseIcon from '~/assets/icons/player/pause.svg';
import PlayIcon from '~/assets/icons/player/play.svg';
import FullScreenIcon from '~/assets/icons/player/fullscreen.svg';

export const Clickable = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  justify-content: center;
  align-items: center;
`;

export const Container = styled(MotiView)`
  flex: 1;
  width: 100%;

  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.8);
`;

export const WrapperCenterButtons = styled.View`
  width: 100%;
  flex: 1;
  flex-grow: 3;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const ControlButton = styled.TouchableOpacity`
  align-items: center;
`;

export const ControlButtonText = styled.Text`
  color: #fff;
  font-size: 12px;
  position: absolute;
  bottom: -20px;
`;

export const Play = styled(PlayIcon)``;

export const Pause = styled(PauseIcon)``;

export const Rewind = styled(RewindIcon)``;

export const FastForward = styled(RewindIcon)`
  transform: rotate(180deg);
`;

export const HiddenPlayPauseButton = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  position: absolute;
`;

export const WrapperSecondaryControls = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  flex: 1;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
`;

export const FullScreen = styled(FullScreenIcon)``;
