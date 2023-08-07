import * as Phaser from "phaser";
import TextureKeys from "../../../constants/TextureKeys";
import AnimationKeys from "../../../constants/AnimationKeys";
import type CaveScene from "../../scenes/CaveScene";
import CameraFollowing from "../../../constants/CameraFollowing";
import PlayerState from "../../../constants/players/PlayerState";
import DragonState from "../../../constants/enemies/DragonState";
import PlayerSoundEffectKeys from "../../../constants/audio/PlayerSoundEffectKeys";
import eventsCenter from "utils/eventsCenter";
import EventKeys from "constants/EventKeys";
import PlayerAbility from "@consts/players/PlayerAbility";
import Clock from "phaser3-rex-plugins/plugins/clock.js";
import type LevelCompleteData from "types/LevelCompleteData";
import MiscSoundEffectKeys from "@consts/audio/MiscSoundEffectKeys";

export default class Player extends Phaser.GameObjects.Container {
  public score = 0;
  private clock!: Clock;
  private time = 0;
  private timeBonus = 0;

  private lastTimeOnGround = 0;
  private lastJumpTime = 0;

  private playerFireballThrow1Sound!: Phaser.Sound.BaseSound;
  private playerJump1Sound!: Phaser.Sound.BaseSound;
  private playerDeath1Sound!: Phaser.Sound.BaseSound;
  private playerDeath2Sound!: Phaser.Sound.BaseSound;
  private playerRun1Sound!: Phaser.Sound.BaseSound;
  private levelCompleteSound!: Phaser.Sound.BaseSound;

  private scenePlayerSpawnX = 0;
  private sceneLevelCompleteX = 0;
  private sceneMinCompleteTime = 0;
  private sceneMaxCompleteTime = 0;
  private sceneScoreMultiplier = 1;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private fireKeyOne!: Phaser.Input.Keyboard.Key;
  private firekeyTwo!: Phaser.Input.Keyboard.Key;
  private wKey!: Phaser.Input.Keyboard.Key;
  private aKey!: Phaser.Input.Keyboard.Key;
  private sKey!: Phaser.Input.Keyboard.Key;
  private dKey!: Phaser.Input.Keyboard.Key;

  private defaultCharacter: Phaser.GameObjects.Sprite;

  private fireballs?: Phaser.Physics.Arcade.Group;
  private fireballSpeed = 450;
  private fireballCooldown = 200;
  private fireballTimer = 0;

  public playerState: PlayerState = PlayerState.Idle;
  private playerSpeed = 220;
  private playerJump = -270;
  private playerSize = 1.0;
  private playerAbility = PlayerAbility.None;
  private gravity = 100;

  private checkScene() {
    const scene = this.scene as CaveScene;

    if (scene) {
      this.scenePlayerSpawnX = scene.playerSpawnX;
      this.sceneLevelCompleteX = scene.levelCompleteX;
      this.sceneMinCompleteTime = scene.minCompleteTime;
      this.sceneMaxCompleteTime = scene.maxCompleteTime;
      this.sceneScoreMultiplier = scene.scoreMultiplier;
    }
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.checkScene();

    this.playerFireballThrow1Sound = this.scene.sound.add(PlayerSoundEffectKeys.PlayerFireballThrow1);
    this.playerJump1Sound = this.scene.sound.add(PlayerSoundEffectKeys.PlayerJump1);
    this.playerDeath1Sound = this.scene.sound.add(PlayerSoundEffectKeys.PlayerDeath1);
    this.playerDeath2Sound = this.scene.sound.add(PlayerSoundEffectKeys.PlayerDeath2);
    this.playerRun1Sound = this.scene.sound.add(PlayerSoundEffectKeys.PlayerRun1);
    this.levelCompleteSound = this.scene.sound.add(MiscSoundEffectKeys.LevelComplete);

    this.defaultCharacter = scene.add
      .sprite(0, 0, TextureKeys.Character)
      .setOrigin(0.5, 1)
      .setScale(this.playerSize * 1.5);

    this.add(this.defaultCharacter);

    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(
      this.playerSize * this.defaultCharacter.width * 0.38,
      this.playerSize * this.defaultCharacter.height * 0.69
    );
    body.setOffset(this.defaultCharacter.width * -0.2, -this.defaultCharacter.height + 1);
    body.setCollideWorldBounds(true);
    body.setDragX(0);
    body.setDragY(0);
    body.setFrictionX(0);
    body.setFrictionY(0);
    body.setGravityY(this.gravity);

    this.clock = new Clock(this.scene);
    this.clock.pause();

    const keyboard = scene.input.keyboard;

    if (!keyboard) {
      return;
    }
    this.cursors = keyboard.createCursorKeys();
    this.fireKeyOne = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.firekeyTwo = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);
    this.wKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.sKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.dKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  private updateScore() {
    this.score = Math.floor(this.x / 10 - this.scenePlayerSpawnX * this.sceneScoreMultiplier);
    if (this.score < 0) {
      this.score = 0;
    }
    eventsCenter.emit(EventKeys.UpdateScore, this.score);

    if (this.score >= this.sceneLevelCompleteX) {
      this.levelComplete();
    }
  }

  public start() {
    this.checkScene();
    eventsCenter.emit(EventKeys.StartGame);
    this.clock.start();
    this.playerState = PlayerState.Alive;
  }

  public setFireballs(fireballs: Phaser.Physics.Arcade.Group) {
    this.fireballs = fireballs;
  }

  private throwFireball() {
    const playerBody = this.body as Phaser.Physics.Arcade.Body;

    if (!this.fireballs) {
      return;
    }

    const fireball = this.fireballs.get(
      this.x,
      this.y - playerBody.height * 0.8,
      TextureKeys.Fireball
    ) as Phaser.Physics.Arcade.Image;
    if (!fireball) {
      return;
    }

    const vec = new Phaser.Math.Vector2(0, 0);

    if (this.defaultCharacter.flipX) {
      fireball.x -= 16;
      vec.x = -1;
    } else {
      vec.x = 1;
    }

    vec.y = 0.4;

    const fireballBody = fireball.body as Phaser.Physics.Arcade.Body;
    fireballBody.setSize(8, 8);

    fireball.setScale(2);
    fireball.setOrigin(0.5, 0.5);
    fireball.setBounceY(0.98);
    fireball.setBounceX(0);
    fireball.setMaxVelocity(300);

    fireball.x += vec.x * 16;
    fireball.y += vec.y * 16;
    fireball.setVelocity(vec.x * this.fireballSpeed, vec.y * this.fireballSpeed);

    this.playerFireballThrow1Sound.play({ volume: 0.5 });
  }

  public kill() {
    this.checkScene();

    if (this.playerState !== PlayerState.Alive) {
      return;
    }

    this.playerState = PlayerState.Killed;

    eventsCenter.emit(EventKeys.UpdateEndScore, this.score);

    this.defaultCharacter.play(AnimationKeys.CharacterDeadRight, true);

    this.playerDeath1Sound.play({ volume: 0.5 });

    this.scene.time.addEvent({
      delay: 1500, // ms
      callback: () => this.playerDeath2Sound.play({ volume: 0.6 }),
      repeat: 0
    });

    const scene = this.scene as CaveScene;

    const cameraFollowing = scene.cameraFollowing;

    if (scene.redDragon.dragonState === DragonState.Chasing) {
      scene.redDragon.dragonState = DragonState.Idle;
    }

    if (cameraFollowing === CameraFollowing.Player) {
      scene.cameras.main.stopFollow();
    }

    scene.cameras.main.fade(2000, 0, 0, 0);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.checkCollision.none = true;
    body.setAccelerationY(0);
    body.setVelocityX(0);
    body.setVelocityY(-200);
    body.setGravityY(230);
    body.collideWorldBounds = false;
  }

  public levelComplete() {
    if (this.playerState !== PlayerState.Alive) {
      return;
    }

    const scene = this.scene as CaveScene;

    this.levelCompleteSound.play({ volume: 0.5 });

    this.playerState = PlayerState.LevelComplete;

    this.time = (this.clock.now / 1000).toFixed(2) as unknown as number;
    if (this.time < this.sceneMinCompleteTime) {
      // This player is cheating
      this.timeBonus = 0;
    } else if (this.time > this.sceneMaxCompleteTime) {
      // This player is too slow
      this.timeBonus = 0;
    } else {
      this.timeBonus = Math.floor((this.sceneMaxCompleteTime - this.time) * 100 * this.sceneScoreMultiplier);
    }

    const levelCompleteData: LevelCompleteData = {
      level: scene.levelNumber,
      score: this.score,
      time: this.time,
      timeBonus: this.timeBonus,
      total: this.score + this.timeBonus
    };

    eventsCenter.emit(EventKeys.UpdateLevelCompleteData, levelCompleteData);

    if (scene.redDragon.dragonState === DragonState.Chasing) {
      scene.redDragon.dragonState = DragonState.Idle;
    }

    eventsCenter.emit(EventKeys.GoToLevelComplete);

    scene.cameras.main.fade(2000, 0, 0, 0);
  }

  public preUpdate(t: number) {
    const body = this.body as Phaser.Physics.Arcade.Body;

    this.checkScene();

    switch (this.playerState) {
      case PlayerState.Idle: {
        this.updateScore();
        if (body.blocked.down && body.velocity.x === 0) {
          this.defaultCharacter.play(AnimationKeys.CharacterIdleRight, true);
        } else {
          this.defaultCharacter.play(AnimationKeys.CharacterJumpingRight, true);
        }
        if (
          this.cursors.left.isDown ||
          this.aKey.isDown ||
          this.cursors.right.isDown ||
          this.dKey.isDown ||
          this.cursors.up.isDown ||
          this.wKey.isDown ||
          this.sKey.isDown ||
          this.cursors.down.isDown
        ) {
          this.start();
        }
        break;
      }

      case PlayerState.Alive: {
        this.updateScore();
        // Left and Right
        if (this.cursors.left.isDown || this.aKey.isDown) {
          body.setVelocityX(-this.playerSpeed);
          this.defaultCharacter.play(AnimationKeys.CharacterRunningRight, true);
          this.defaultCharacter.setFlipX(true);
        } else if (this.cursors.right.isDown || this.dKey.isDown) {
          body.setVelocityX(this.playerSpeed);
          this.defaultCharacter.play(AnimationKeys.CharacterRunningRight, true);
          this.defaultCharacter.setFlipX(false);
        } else {
          body.setVelocityX(0);
        }
        // Up
        if (this.cursors.up.isDown || this.wKey.isDown || this.cursors.space.isDown) {
          this.lastJumpTime = t;
          // Jumping from the ground
          if (body.blocked.down) {
            body.setVelocityY(this.playerJump);
            this.playerJump1Sound.play({ volume: 0.8 });
          } else if (body.blocked.down && t - this.lastTimeOnGround < 140 && body.velocity.y >= 0) {
            // Jumping pressed just before leaving ground
            body.setVelocityY(this.playerJump);
            this.playerJump1Sound.play({ volume: 0.8 });
          } else if (t - this.lastTimeOnGround < 140 && body.velocity.y >= 0) {
            // Jumping just after leaving ground
            body.setVelocityY(this.playerJump);
            this.playerJump1Sound.play({ volume: 0.8 });
          } else if (body.velocity.y < 0) {
            // Jumping in the air
            body.setVelocityY(body.velocity.y * 1.02);
          } else if (body.velocity.y > 0) {
            // Falling
            body.setVelocityY(body.velocity.y * 0.97);
          }
        }
        // Down
        if (this.cursors.down.isDown || this.sKey.isDown) {
          if (body.velocity.y > 0 || body.velocity.y < 0) {
            body.setVelocityY(body.velocity.y * 1.02);
          }
        }

        if (body.blocked.down) {
          this.lastTimeOnGround = t;
        }

        if (!body.blocked.down && body.velocity.x < 0) {
          this.defaultCharacter.play(AnimationKeys.CharacterJumpingRight, true);
          this.defaultCharacter.setFlipX(true);
        } else if (!body.blocked.down && body.velocity.x > 0) {
          this.defaultCharacter.play(AnimationKeys.CharacterJumpingRight, true);
          this.defaultCharacter.setFlipX(false);
        } else if (!body.blocked.down && body.velocity.x === 0) {
          this.defaultCharacter.play(AnimationKeys.CharacterJumpingRight, true);
        }

        if (this.playerAbility === PlayerAbility.Fireball) {
          if (Phaser.Input.Keyboard.JustDown(this.fireKeyOne) || Phaser.Input.Keyboard.JustDown(this.firekeyTwo)) {
            if (t < this.fireballTimer) {
              return;
            }
            this.throwFireball();
            this.fireballTimer = t + this.fireballCooldown;
          }
        }

        if (body.blocked.down && body.velocity.x === 0) {
          this.defaultCharacter.play(AnimationKeys.CharacterIdleRight, true);
        }

        if (
          (this.cursors.left.isDown && body.velocity.x < 0 && body.blocked.down) ||
          (this.aKey.isDown && body.velocity.x < 0 && body.blocked.down) ||
          (this.cursors.right.isDown && body.velocity.x > 0 && body.blocked.down) ||
          (this.dKey.isDown && body.velocity.x > 0 && body.blocked.down)
        ) {
          if (!this.scene.sound.get(PlayerSoundEffectKeys.PlayerRun1)) {
            this.playerRun1Sound.play(PlayerSoundEffectKeys.PlayerRun1, { rate: 1.2, volume: 0.2 });
          }
        }

        break;
      }

      case PlayerState.Killed: {
        body.velocity.x *= 0.99;
        if (body.velocity.x <= 5) {
          this.playerState = PlayerState.Dead;
          eventsCenter.emit(EventKeys.GoToGameOver);
        }
        break;
      }

      case PlayerState.Dead: {
        const scene = this.scene as CaveScene;
        scene.music.stop();

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
          eventsCenter.emit(EventKeys.RestartGame);
        }
        break;
      }

      case PlayerState.LevelComplete: {
        const scene = this.scene as CaveScene;
        scene.music.stop();

        if (body.velocity.x > 20) {
          this.defaultCharacter.play(AnimationKeys.CharacterRunningRight, true);
          this.defaultCharacter.setFlipX(false);
        } else {
          this.defaultCharacter.play(AnimationKeys.CharacterIdleRight, true);
        }

        body.velocity.x *= 0.99;

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
          eventsCenter.emit(EventKeys.RestartGame);
        }
        break;
      }
    }
  }
}
