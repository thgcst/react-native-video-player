import styled from 'styled-components/native';

import CloseIcon from '~/assets/icons/player/close.svg';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Clickable = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

interface IName {
  selected: boolean;
}
export const Name = styled.Text<IName>`
  font-size: 16px;
  color: white;
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
  text-decoration-color: white;
`;

export const WrapperClose = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const Close = styled(CloseIcon).attrs({
  width: 32,
  height: 32,
})`
  fill: white;
`;
