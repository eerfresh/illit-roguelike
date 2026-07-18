export interface DamageCalculation {
  baseDamage: number;
  isCritical: boolean;
  finalDamage: number;
  mitigation: number;
}

export class CombatSystem {
  static calculateDamage(
    attacker: any,
    defender: any,
    isCritical: boolean = false
  ): DamageCalculation {
    const baseDamage = attacker.stats.attack;
    const critMultiplier = isCritical ? 1.5 : 1.0;
    const damageAfterCrit = baseDamage * critMultiplier;

    const defenseReduction = defender.stats.defense / (defender.stats.defense + 100);
    const mitigation = damageAfterCrit * defenseReduction;
    const finalDamage = Math.max(1, damageAfterCrit - mitigation);

    return {
      baseDamage,
      isCritical,
      finalDamage: Math.floor(finalDamage),
      mitigation: Math.floor(mitigation),
    };
  }

  static checkCritical(critChance: number = 0.15): boolean {
    return Math.random() < critChance;
  }

  static checkDodge(dodgeChance: number = 0.05, attackerAccuracy: number = 1.0): boolean {
    const effectiveDodge = dodgeChance * (1 / attackerAccuracy);
    return Math.random() < effectiveDodge;
  }

  static calculateHealing(healer: any, targetMaxHP: number): number {
    const baseHealing = healer.stats.attack * 0.6;
    const healingPower = (healer.stats.healingPower || 1.0);
    return Math.floor(baseHealing * healingPower);
  }

  static applyStatusEffect(target: any, effect: string, duration: number, potency: number) {
    if (!target.statusEffects) {
      target.statusEffects = {};
    }
    target.statusEffects[effect] = { duration, potency };
  }

  static updateStatusEffects(character: any, deltaTime: number) {
    if (!character.statusEffects) return;

    Object.entries(character.statusEffects).forEach(([effect, data]: [string, any]) => {
      data.duration -= deltaTime;
      if (data.duration <= 0) {
        delete character.statusEffects[effect];
      }
    });
  }

  static getStatusModifier(character: any, stat: string): number {
    if (!character.statusEffects) return 1.0;

    let modifier = 1.0;
    Object.entries(character.statusEffects).forEach(([effect, data]: [string, any]) => {
      if (effect === 'slow' && stat === 'speed') {
        modifier *= 1 - data.potency;
      } else if (effect === 'weaken' && stat === 'attack') {
        modifier *= 1 - data.potency;
      } else if (effect === 'brittle' && stat === 'defense') {
        modifier *= 1 - data.potency;
      }
    });
    return modifier;
  }
}