import { useOverlay } from "../../context/useOverlay";
import OverlayKeys from "../../consts/OverlayKeys";

export default function GameOver() {

  const { setOverlay } = useOverlay();

  return (
    <div className="home">
      <div className="home-buttons">
        <button className="home-button" onClick={() => (setOverlay(OverlayKeys.Game))}>GameOver</button>
      </div>
    </div>
  );
}
