import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  width?: string;
  maxWidth?: string;
  disabled?: boolean;
  margin?: string;
}

export const Container = styled.TouchableOpacity.attrs({
  delayPressIn: 0,
  activeOpacity: 0.5,
})<ButtonProps>`
  height: 55px;
  width: ${props => props.width};
  max-width: ${props => props.maxWidth};
  padding: 0 15px;
  background-color: ${({ theme }) => theme.colors.gray[300]};
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  margin: ${props => props.margin};
`;

export const Description = styled.Text.attrs({
  allowFontScaling: false,
})<ButtonProps>`
  font-size: 16px;
  /* font-family: ${({ theme }) => theme.fonts.bold}; */
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;
