import logo from "@assets/Dragon_Run_Logo_Transparent.png";
import hell from "@assets/Hell.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faBox,
  faRankingStar,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
export default function Home() {
  return (
    <div className="home">
      <img src={hell} alt="logo" className="home-background-image" />
      <div className="home-navigation">
        <a href="https://emptea.xyz">
          <FontAwesomeIcon icon={faGear} />
        </a>
        <a href="https://emptea.xyz">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://emptea.xyz">
          <FontAwesomeIcon icon={faDiscord} />
        </a>
      </div>
      <div className="home-content">
        <div className="home-image">
          <img src={logo} alt="logo" />
        </div>
        <div className="home-buttons">
          <div className="home-buttons-content">
            <div className="home-secondary-buttons">
              <button>
                <FontAwesomeIcon icon={faRankingStar} />
              </button>
              <button>
                <FontAwesomeIcon icon={faBox} />
              </button>
              <button>
                <FontAwesomeIcon icon={faCartShopping} />
              </button>
            </div>
            <div className="home-play-button">
              <button>play!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
