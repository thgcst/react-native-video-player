import { useNavigation } from '@react-navigation/native';
import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '~/navigation';

import data from './data';

import { Container, WrapperContent, List, WrapperText, Text } from './styles';

const Home: React.FC = () => {
  type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'HOME'
  >;
  const { navigate } = useNavigation<HomeScreenNavigationProp>();

  return (
    <Container>
      <WrapperContent>
        <List>
          {data.map((item, index) => (
            <WrapperText
              first={index === 0}
              key={item.id}
              onPress={() => navigate('VIDEO', item)}>
              <Text>{item.teacher}</Text>
            </WrapperText>
          ))}
        </List>
      </WrapperContent>
    </Container>
  );
};

export default Home;
