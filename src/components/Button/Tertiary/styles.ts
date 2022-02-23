import styled, { css } from 'styled-components/native';
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
  background-color: ${({ theme }) => theme.colors.blue[300]};
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  margin: ${props => props.margin};
  shadow-color: ${({ theme }) => theme.colors.blue[300]};
  shadow-offset: 0 10px;
  shadow-opacity: 0.3;
  shadow-radius: 25px;
  elevation: 6
    ${({ disabled }) =>
      disabled &&
      css`
        background-color: #bfbfbf;
        shadow-opacity: 0;
        elevation: 0;
      `};
`;

export const Description = styled.Text.attrs({
  allowFontScaling: false,
})<ButtonProps>`
  font-size: 16px;
  /* font-family: ${({ theme }) => theme.fonts.bold}; */
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;
