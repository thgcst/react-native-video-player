import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  background-color: #282a35;
`;

export const WrapperContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingTop: 20, paddingHorizontal: 16 },
})``;

export const List = styled.View`
  background-color: #51556c;
  padding: 0 8px;
  border-radius: 8px;
`;

export const WrapperText = styled.TouchableOpacity<{ first: boolean }>`
  padding: 8px;
  border-top-width: ${({ first }) => (first ? 0 : 1)}px;
  border-top-color: #787d99;
`;

export const Text = styled.Text`
  color: rgb(220, 220, 220);
`;
