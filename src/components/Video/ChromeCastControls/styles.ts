import styled from 'styled-components/native';

import ChromeCastOnIcon from '~/assets/icons/player/chromecast-on.svg';

export const Container = styled.TouchableOpacity`
  flex: 1;
  width: 100%;

  justify-content: center;
  align-items: center;

  background-color: black;
`;

export const ChromeCastOn = styled(ChromeCastOnIcon).attrs({
  width: 50,
  height: 50,
})`
  margin-bottom: 16px;
`;

export const Description = styled.Text`
  color: white;
`;
