import { Platform } from 'react-native';

import {
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from 'react-native-iphone-x-helper';

type Props = {
  width: number;
  height: number;
};

const Metrics = ({ width, height }: Props) => ({
  headerPadding: Platform.OS === 'ios' ? 20 : 0,
  basePadding: 30,
  baseMargin: 30,
  screenWidth: width,
  screenHeight: height,
  statusHeight: getStatusBarHeight(),
  notchHeight: isIphoneX() ? getStatusBarHeight() : 0,
  marginBottom: getBottomSpace() / 2,
  isIphoneX: isIphoneX(),
});

export default Metrics;
