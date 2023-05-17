import { useOverlay } from "../../context/useOverlay";
import OverlayKeys from "../../consts/OverlayKeys";

export default function Game() {

  const { setOverlay } = useOverlay();

  return (
    <div className="home">
      <div className="home-buttons">
        <button className="home-button" onClick={() => (setOverlay(OverlayKeys.Game))}>Game</button>
      </div>
    </div>
  );
}
