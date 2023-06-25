import React, { useEffect, useState } from "react";
//
import hell from "@assets/Hell.png";
import logo from "@assets/Dragon_Run_Logo_Transparent.png";
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
//
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
//
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material";
import { Typography } from "@mui/material";
//
import eventsCenter from "utils/eventsCenter";
//
import EventKeys from "constants/EventKeys";
import HomeNavBar from "components/HomeNavBar";
import SettingsMenu from "components/SettingsMenu";
import OverlayWrapper from "components/OverlayWrapper";
import AnimatedPage from "components/animated/AnimatedPage";
import { SquareButton } from "components/styled/SquareButton";
import Leaderboard from "components/leaderboard/LeaderboardMenu";
import InventoryDialog from "components/inventory/InventoryDialog";
import ChooseCharacterDialog from "components/choose-character/ChooseCharacterDialog";

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
