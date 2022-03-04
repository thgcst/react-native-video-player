import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: ${({ theme }) =>
    theme.metrics.notchHeight + theme.metrics.basePadding}px;
  background-color: #282a35;
`;

export const WrapperVideo = styled.View<{ portrait: boolean }>`
  ${({ portrait }) =>
    portrait
      ? css`
          width: ${({ theme }) => theme.metrics.screenWidth}px;
          height: ${({ theme }) => (theme.metrics.screenWidth / 16) * 9}px;
        `
      : css`
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: #000;
        `};
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

export const Text = styled.Text<{ selected: boolean }>`
  ${({ selected }) =>
    selected
      ? css`
          color: white;
          font-weight: bold;
        `
      : css`
          color: rgb(220, 220, 220);
        `};
`;
