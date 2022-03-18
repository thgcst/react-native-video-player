import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import ReText from './AnimatedText';

export const Container = styled.View`
  flex: 1;
  margin: 0 16px;
  align-items: center;
  flex-direction: row;
`;

export const NotLoadedBar = styled.View`
  height: 2px;
  flex: 1;
  background-color: rgb(150, 150, 150);
`;

export const LoadedBar = styled(Animated.View)`
  height: 2px;
  background-color: white;
  position: absolute;
  left: 0;
`;

export const PlayedBar = styled(Animated.View)`
  height: 2px;
  background-color: #e0bf5a;
  position: absolute;
  left: 0;
`;

export const ThumbWrapper = styled(Animated.View)`
  width: 24px;
  height: 24px;
  border-radius: 25px;
  z-index: 2;
  position: absolute;
  transform: translateX(-12px);

  justify-content: center;
  align-items: center;
`;

export const Thumb = styled(Animated.View)`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: #e0bf5a;
`;

export const CurrentTime = styled(ReText)`
  color: white;
  font-weight: bold;
  width: 66px;
  text-align: center;
`;
