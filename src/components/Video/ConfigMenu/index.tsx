import React, { useContext } from 'react';
import Modal from 'react-native-modal';
import useOrientation from '~/hooks/useOrientation';
import VideoContext from '../VideoContext';

import {
  Container,
  WrapperOptions,
  Title,
  Clickable,
  Name,
  WrapperClose,
  Close,
} from './styles';

interface IConfigMenu {
  isVisible: boolean;
  setVideoRate: React.Dispatch<React.SetStateAction<number>>;
  closeMenu: () => void;
}

const ConfigMenu: React.FC<IConfigMenu> = ({
  isVisible,
  setVideoRate,
  closeMenu,
}) => {
  const orientation = useOrientation();
  const { videoRate } = useContext(VideoContext);

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.8}
      onBackdropPress={closeMenu}>
      <Container>
        <Title>Velocidade</Title>
        <WrapperOptions row={orientation === 'LANDSCAPE'}>
          <Clickable onPress={() => setVideoRate(0.5)}>
            <Name selected={videoRate === 0.5}>0.5x</Name>
          </Clickable>

          <Clickable onPress={() => setVideoRate(0.75)}>
            <Name selected={videoRate === 0.75}>0.75x</Name>
          </Clickable>

          <Clickable onPress={() => setVideoRate(1)}>
            <Name selected={videoRate === 1} bold>
              Normal
            </Name>
          </Clickable>

          <Clickable onPress={() => setVideoRate(1.5)}>
            <Name selected={videoRate === 1.5}>1.5x</Name>
          </Clickable>

          <Clickable onPress={() => setVideoRate(2)}>
            <Name selected={videoRate === 2}>2x</Name>
          </Clickable>
        </WrapperOptions>

        <WrapperClose onPress={closeMenu}>
          <Close />
        </WrapperClose>
      </Container>
    </Modal>
  );
};

export default ConfigMenu;
