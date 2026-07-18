import { Physics, Scene } from 'phaser';
import { Enemy } from './Enemy';

export class BossMonster extends Enemy {
  public phase: number = 1;
  public maxPhase: number = 3;
  public specialAbilityReady: boolean = false;
  public patternIndex: number = 0;

  constructor(scene: Scene, x: number, y: number, bossName: string, floorNumber: number) {
    super(scene, x, y, bossName, floorNumber);

    const bossMultiplier = Math.pow(1.5, floorNumber);
    this.stats.hp = Math.floor(this.stats.hp * bossMultiplier * 3);
    this.stats.attack = Math.floor(this.stats.attack * bossMultiplier * 1.5);
    this.stats.defense = Math.floor(this.stats.defense * bossMultiplier * 2);

    this.maxHP = this.stats.hp;
    this.currentHP = this.maxHP;
    this.setScale(3);
  }

  updatePhase() {
    const healthPercent = this.currentHP / this.maxHP;

    if (healthPercent < 0.33 && this.phase < 3) {
      this.phase = 3;
      this.stats.attack *= 1.3;
    } else if (healthPercent < 0.66 && this.phase < 2) {
      this.phase = 2;
      this.stats.attack *= 1.15;
    }
  }

  getPhasePercent(): number {
    return this.currentHP / this.maxHP;
  }
}