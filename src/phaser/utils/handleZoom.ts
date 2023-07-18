import type CaveScene from "phaser/scenes/CaveScene";
import Device from "constants/Device";

const handleZoom = (scene: CaveScene) => {
  const width = scene.scale.width;
  const height = scene.scale.height;

  if (width >= 1000) {
    scene.device = Device.Desktop;
    switch (true) {
      case width < 1200:
        scene.zoom = 0.6;
        break;
      case width < 1400:
        scene.zoom = 0.6;
        break;
      case width < 1600:
        scene.zoom = 0.7;
        break;
      case width >= 1600:
        scene.zoom = 0.7;
        break;
    }
  } else if (width < height) {
    scene.device = Device.MobilePortrait;
    switch (true) {
      case width < 400:
        scene.zoom = 0;
        break;
      case width < 500:
        scene.zoom = 0.2;
        break;
      case width < 600:
        scene.zoom = 0.5;
        break;
      case width < 1000:
        scene.zoom = 0.7;
        break;
    }
  } else {
    scene.device = Device.MobileLandscape;
    switch (true) {
      case height < 300:
        scene.zoom = -0.2;
        break;
      case height < 400:
        scene.zoom = -0.1;
        break;
      case height < 500:
        scene.zoom = 0;
        break;
      case height < 600:
        scene.zoom = 0.1;
        break;
      case height < 800:
        scene.zoom = 0.2;
        break;
      case height < 1000:
        scene.zoom = 0.3;
        break;
      case height < 1200:
        scene.zoom = 0.3;
        break;
      case height < 1400:
        scene.zoom = 0.4;
        break;
      case height < 1600:
        scene.zoom = 0.5;
        break;
      case height >= 1600:
        scene.zoom = 0.6;
        break;
    }
  }

  switch (scene.device) {
    case Device.MobilePortrait:
      scene.dragonCameraOffset = -(width * 0.3) + (-200 + 210 * (scene.defaultZoom + scene.zoom));
      break;
    case Device.MobileLandscape:
      scene.dragonCameraOffset = -(width * 0.5) + (-240 + 380 * (scene.defaultZoom + scene.zoom));
      break;
    case Device.Desktop:
      scene.dragonCameraOffset = -(width * 0.3) + (-200 + 210 * (scene.defaultZoom + scene.zoom));
  }

  if (scene.cameras.main) {
    scene.cameras.main.setZoom(scene.defaultZoom + scene.zoom);
  }
};

export default handleZoom;
