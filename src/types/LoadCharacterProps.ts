import type EventKeys from "@consts/EventKeys";

interface LoadCharacterProps {
  characterLink: string | null;
  nextEventKey: EventKeys | null;
  nextEventProps?: any;
}

export default LoadCharacterProps;
