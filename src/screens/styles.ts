import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: ${({ theme }) =>
    theme.metrics.notchHeight + theme.metrics.basePadding}px;
`;

export const WrapperVideo = styled.View``;
