import colors from './colors';
import fonts from './fonts';
import general from './general';
import metrics from './metrics';

type Props = {
  width: number;
  height: number;
};

const theme = (dimensions: Props) => ({
  colors,
  metrics: metrics(dimensions),
  fonts,
  general,
});

export default theme;
