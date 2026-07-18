import { Physics, Scene } from 'phaser';
import { CombatSystem } from '../systems/CombatSystem';

export class Player extends Physics.Arcade.Sprite {
  public stats: any;
  public currentHP: number;
  public cheerMeter: number = 0;
  public maxCheerMeter: number = 100;
  public inventory: any[] = [];
  public talents: any[] = [];
  public isAttacking: boolean = false;
  public attackCooldown: number = 0;
  public ultimateSkillReady: boolean = false;
  public statusEffects: Record<string, any> = {};
  public characterData: any;

  constructor(scene: Scene, x: number, y: number, character: any) {
    super(scene, x, y, `character_${character.id}`);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.characterData = character;
    this.stats = {
      hp: character.baseHP,
      attack: character.baseAttack,
      defense: character.baseDefense,
      speed: character.baseSpeed,
      cheerGeneration: 1.0,
    };
    this.currentHP = this.stats.hp;
    this.setScale(2);
    this.setCollideWorldBounds(true);
    this.setBounce(0.1, 0.1);
  }

  update(deltaTime: number) {
    CombatSystem.updateStatusEffects(this, deltaTime / 1000);

    if (this.attackCooldown > 0) {
      this.attackCooldown -= deltaTime;
    }

    if (this.stats.regenPerSecond) {
      const regen = this.stats.regenPerSecond * this.stats.hp * (deltaTime / 1000);
      this.heal(regen);
    }
  }

  takeDamage(damage: number): number {
    const actualDamage = Math.max(1, Math.floor(damage));
    this.currentHP = Math.max(0, this.currentHP - actualDamage);

    this.setTint(0xff6666);
    this.scene.time.delayedCall(100, () => this.clearTint());

    return actualDamage;
  }

  heal(amount: number): number {
    const actualHeal = Math.floor(amount);
    this.currentHP = Math.min(this.stats.hp, this.currentHP + actualHeal);
    return actualHeal;
  }

  addCheer(amount: number) {
    this.cheerMeter = Math.min(this.maxCheerMeter, this.cheerMeter + amount);
    if (this.cheerMeter >= this.maxCheerMeter) {
      this.ultimateSkillReady = true;
    }
  }

  useUltimate(): boolean {
    if (!this.ultimateSkillReady || this.cheerMeter < 50) {
      return false;
    }
    this.cheerMeter -= 50;
    this.ultimateSkillReady = false;
    return true;
  }

  isDead(): boolean {
    return this.currentHP <= 0;
  }

  getHealthPercent(): number {
    return this.currentHP / this.stats.hp;
  }
}