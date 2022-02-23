import styled from 'styled-components/native';

interface IContainer {
  error: boolean;
}

export const Container = styled.View<IContainer>`
  padding-bottom: ${({ error }) => (error ? 20 : 0)}px;
`;

export const WrapperInput = styled.View`
  height: 70px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  z-index: 5;

  ${({ theme }) => theme.general.shadow};
`;

export const Input = styled.TextInput`
  padding: 0 20px;
  flex: 1;
  height: 100%;
  /* font-family: ${({ theme }) => theme.fonts.medium}; */
  font-size: 20px;
  color: ${({ theme }) => theme.colors.body};
`;

export const WrapperError = styled.View`
  position: absolute;
  bottom: 0;
  left: 10px;
  z-index: 1;
`;

export const ErrorText = styled.Text`
  /* font-family: ${({ theme }) => theme.fonts.regular}; */
  font-size: 14px;
  color: ${({ theme }) => theme.colors.red[300]};
`;

export const WrapperShow = styled.TouchableOpacity.attrs({
  hitSlop: { top: 15, bottom: 15 },
})`
  justify-content: center;
  align-items: center;
`;

export const ShowText = styled.Text`
  /* font-family: ${({ theme }) => theme.fonts.bold}; */
  font-size: 16px;
  color: ${({ theme }) => theme.colors.body};
  opacity: 0.4;
  margin-right: 20px;
`;
