import Phaser from 'phaser';
import Boot from './scenes/Boot';
import MainMenu from './scenes/MainMenu';
import DungeonFloor from './scenes/DungeonFloor';
import Shop from './scenes/Shop';
import EventRoom from './scenes/EventRoom';
import BossRoom from './scenes/BossRoom';
import { GAME_CONFIG } from './config/gameConfig';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Boot, MainMenu, DungeonFloor, Shop, EventRoom, BossRoom],
  backgroundColor: '#0a0e27',
  render: {
    pixelArt: false,
    antialias: true,
  },
};

const game = new Phaser.Game(config);