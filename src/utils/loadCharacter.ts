import eventsCenter from './eventsCenter';
import EventKeys from '@consts/EventKeys';
import type LoadCharacterProps from 'types/LoadCharacterProps';

const loadCharacter = (characterLink: string | null, nextEventKey: EventKeys | null) => {
  const loadCharacterProps: LoadCharacterProps = {
    characterLink,
    nextEventKey
  };
  eventsCenter.emit(EventKeys.LoadCharacter, loadCharacterProps);
};

export default loadCharacter;
