import { Physics, Scene } from 'phaser';
import { CombatSystem } from '../systems/CombatSystem';

export class Enemy extends Physics.Arcade.Sprite {
  public stats: any;
  public currentHP: number;
  public maxHP: number;
  public isAlive: boolean = true;
  public statusEffects: Record<string, any> = {};
  public attackCooldown: number = 0;
  public minion: boolean = false;

  constructor(scene: Scene, x: number, y: number, enemyType: string, level: number = 1) {
    super(scene, x, y, `enemy_${enemyType}`);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.minion = enemyType.includes('minion');

    const baseHP = this.minion ? 30 : 50;
    const baseAttack = this.minion ? 10 : 20;
    const baseDefense = this.minion ? 5 : 10;

    const scaleFactor = Math.pow(1.15, level - 1);

    this.stats = {
      hp: Math.floor(baseHP * scaleFactor),
      attack: Math.floor(baseAttack * scaleFactor),
      defense: Math.floor(baseDefense * scaleFactor),
      speed: 60,
    };

    this.maxHP = this.stats.hp;
    this.currentHP = this.maxHP;
    this.setScale(1.5);
    this.setBounce(0.2, 0.2);
  }

  update(deltaTime: number) {
    CombatSystem.updateStatusEffects(this, deltaTime / 1000);

    if (this.attackCooldown > 0) {
      this.attackCooldown -= deltaTime;
    }
  }

  takeDamage(damage: number): number {
    const actualDamage = Math.max(1, Math.floor(damage));
    this.currentHP = Math.max(0, this.currentHP - actualDamage);

    if (this.currentHP <= 0) {
      this.isAlive = false;
    }

    return actualDamage;
  }

  getHealthPercent(): number {
    return this.currentHP / this.maxHP;
  }
}