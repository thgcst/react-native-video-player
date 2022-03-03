import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: ${({ theme }) =>
    theme.metrics.notchHeight + theme.metrics.basePadding}px;
`;

export const WrapperVideo = styled.View``;

export const WrapperButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px;
  border-radius: 8px;
  background-color: #efefef;
`;

export const Button = styled.Button``;

export const TimeText = styled.Text``;
