import React, { useContext } from 'react';

import Modal from 'react-native-modal';

import VideoContext from '../VideoContext';

import {
  Container,
  Title,
  Clickable,
  Name,
  WrapperClose,
  Close,
} from './styles';

interface ISubtitlesMenu {
  isVisible: boolean;
  setSelectedSubtitle: React.Dispatch<
    React.SetStateAction<
      | {
          type: 'title';
          value: string;
        }
      | undefined
    >
  >;
  closeMenu: () => void;
}

const SubtitlesMenu: React.FC<ISubtitlesMenu> = ({
  isVisible,
  setSelectedSubtitle,
  closeMenu,
}) => {
  const { subtitles, selectedSubtitle } = useContext(VideoContext);

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.8}
      onBackdropPress={closeMenu}>
      <Container>
        <Title>Legendas</Title>
        <Clickable onPress={() => setSelectedSubtitle(undefined)}>
          <Name selected={selectedSubtitle?.value === undefined}>
            Sem legenda
          </Name>
        </Clickable>
        {subtitles.map(subtitle => (
          <Clickable
            onPress={() =>
              setSelectedSubtitle({ type: 'title', value: subtitle.title })
            }
            key={subtitle.title}>
            <Name selected={selectedSubtitle?.value === subtitle.title}>
              {subtitle.title}
            </Name>
          </Clickable>
        ))}
        <WrapperClose onPress={closeMenu}>
          <Close />
        </WrapperClose>
      </Container>
    </Modal>
  );
};

export default SubtitlesMenu;
