import eventsCenter from "./eventsCenter";
import EventKeys from "@consts/EventKeys";
import type LoadCharacterProps from "types/LoadCharacterProps";

const loadCharacter = (characterLink: string | null, nextEventKey: EventKeys | null, nextEventProps?: any) => {
  const loadCharacterProps: LoadCharacterProps = {
    characterLink,
    nextEventKey,
    nextEventProps
  };
  eventsCenter.emit(EventKeys.LoadCharacter, loadCharacterProps);
};

export default loadCharacter;
