import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding-top: ${({ theme }) => theme.metrics.statusHeight}px;
`;

export const WrapperTop = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image.attrs({ resizeMode: 'contain' })`
  width: 162px;
`;

export const WrapperMiddle = styled.View`
  flex: 2;
  padding: 0 21px;
`;

export const WrapperInput = styled.View`
  padding-top: 30px;
`;

export const WrapperForgotPassword = styled.TouchableOpacity.attrs({
  delayPressIn: 0,
  hitSlop: { top: 5, bottom: 10, left: 20, right: 10 },
})`
  align-self: flex-end;
  margin-top: 10px;
`;

export const ForgotPasswordText = styled.Text`
  color: #0080ff;
  font-size: 14px;
`;

export const WrapperButtons = styled.View`
  margin-top: 48px;
`;
