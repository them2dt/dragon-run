import SceneKeys from "@consts/SceneKeys";

const levels = [
  {
    number: 1,
    sceneKey: SceneKeys.Level1Scene,
    image: "level-1.png",
    comingSoon: false,
    completed: true,
    locked: false
  },
  {
    number: 2,
    sceneKey: SceneKeys.Level1Scene,
    image: "level-1.png",
    comingSoon: false,
    completed: false,
    locked: false
  },
  {
    number: 3,
    comingSoon: false,
    completed: false,
    locked: true
  },
  {
    number: 4,
    comingSoon: true,
    completed: false,
    locked: false
  }
];

export default levels;
