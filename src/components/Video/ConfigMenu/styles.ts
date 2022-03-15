import styled from 'styled-components/native';

import CloseIcon from '~/assets/icons/player/close.svg';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

interface IWrapperOptions {
  row: boolean;
}

export const WrapperOptions = styled.View<IWrapperOptions>`
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
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
  padding: 10px;
  margin: 5px;
`;

interface IName {
  selected: boolean;
  bold?: boolean;
}
export const Name = styled.Text<IName>`
  font-size: 16px;
  color: white;
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
  text-decoration-color: white;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
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
