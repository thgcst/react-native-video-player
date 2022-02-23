import { Dimensions, Platform } from 'react-native';
import {
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from 'react-native-iphone-x-helper';

const { width, height } = Dimensions.get('window');

const Metrics = {
  headerPadding: Platform.OS === 'ios' ? 20 : 0,
  basePadding: 30,
  baseMargin: 30,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  statusHeight: getStatusBarHeight(),
  notchHeight: isIphoneX() ? getStatusBarHeight() : 0,
  marginBottom: getBottomSpace() / 2,
  isIphoneX: isIphoneX(),
};

export default Metrics;
