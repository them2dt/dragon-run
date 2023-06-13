import eventsCenter from './eventsCenter';
import EventKeys from '@consts/EventKeys';
import type LoadCharacterProps from 'types/LoadCharacterProps';

const loadCharacter = (characterLink: string | null, nextEvent: EventKeys | null) => {
  const loadCharacterProps: LoadCharacterProps = {
    characterLink,
    nextEvent
  };
  console.log('Clicked');
  eventsCenter.emit(EventKeys.LoadCharacter, loadCharacterProps);
};

export default loadCharacter;
