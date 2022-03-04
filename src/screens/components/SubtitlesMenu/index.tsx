import React, { useContext } from 'react';
import Modal from 'react-native-modal';
import VideoContext from '~/screens/VideoContext';

import { Container, Title, Clickable, Name } from './styles';

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
}

const SubtitlesMenu: React.FC<ISubtitlesMenu> = ({
  isVisible,
  setSelectedSubtitle,
}) => {
  const { subtitles, selectedSubtitle } = useContext(VideoContext);

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.8}>
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
            }>
            <Name selected={selectedSubtitle?.value === subtitle.title}>
              {subtitle.title}
            </Name>
          </Clickable>
        ))}
      </Container>
    </Modal>
  );
};

export default SubtitlesMenu;
