export interface CharacterBuild {
  name: string;
  description: string;
  statModifiers: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    cheer: number;
  };
}

export interface Character {
  id: string;
  name: string;
  role: 'tank' | 'damage' | 'healer' | 'support' | 'controller';
  baseHP: number;
  baseAttack: number;
  baseDefense: number;
  baseSpeed: number;
  builds: CharacterBuild[];
  ultimateSkill: {
    name: string;
    cheerCost: number;
    effect: string;
  };
  exclusiveRelics: string[];
}

export const CHARACTERS: Record<string, Character> = {
  YUNAH: {
    id: 'yunah',
    name: 'Yunah - Captain',
    role: 'tank',
    baseHP: 150,
    baseAttack: 60,
    baseDefense: 80,
    baseSpeed: 70,
    builds: [
      {
        name: 'Guardian',
        description: '+30% HP, +15% Defense, generates taunts',
        statModifiers: { hp: 1.3, attack: 1.0, defense: 1.15, speed: 0.95, cheer: 1.0 },
      },
      {
        name: 'Aegis Warden',
        description: '+20% Defense, +25% Block chance',
        statModifiers: { hp: 1.15, attack: 0.9, defense: 1.25, speed: 0.85, cheer: 1.1 },
      },
      {
        name: 'Radiant Shield',
        description: '+20% HP, Healing aura to nearby allies',
        statModifiers: { hp: 1.2, attack: 0.85, defense: 1.1, speed: 1.0, cheer: 1.3 },
      },
    ],
    ultimateSkill: {
      name: 'Fortress Formation',
      cheerCost: 50,
      effect: 'Reduce all damage taken by 60% for 4 seconds, gain +2 taunts',
    },
    exclusiveRelics: ['yunah_relic_fortress', 'yunah_relic_blessing'],
  },
  MOKA: {
    id: 'moka',
    name: 'Moka - Vocalist',
    role: 'damage',
    baseHP: 100,
    baseAttack: 120,
    baseDefense: 50,
    baseSpeed: 85,
    builds: [
      {
        name: 'Sharpshooter',
        description: '+30% Attack, projectiles pierce enemies',
        statModifiers: { hp: 0.9, attack: 1.3, defense: 0.8, speed: 1.1, cheer: 1.0 },
      },
      {
        name: 'Burst Maestro',
        description: '+25% Attack Speed, critical strikes refund cooldown',
        statModifiers: { hp: 0.85, attack: 1.25, defense: 0.75, speed: 1.2, cheer: 1.15 },
      },
      {
        name: 'Harmonic Echo',
        description: 'Attacks grant buffs to allies, +cheer generation',
        statModifiers: { hp: 1.0, attack: 1.15, defense: 0.9, speed: 1.0, cheer: 1.4 },
      },
    ],
    ultimateSkill: {
      name: 'Vocal Crescendo',
      cheerCost: 50,
      effect: 'Fire 5 homing projectiles, each reduces cooldowns by 20%',
    },
    exclusiveRelics: ['moka_relic_precision', 'moka_relic_harmony'],
  },
  MINJU: {
    id: 'minju',
    name: 'Minju - Healer',
    role: 'healer',
    baseHP: 110,
    baseAttack: 70,
    baseDefense: 65,
    baseSpeed: 75,
    builds: [
      {
        name: 'Celestial Mender',
        description: '+40% Healing power, passive heal aura',
        statModifiers: { hp: 1.2, attack: 0.8, defense: 1.1, speed: 0.85, cheer: 1.2 },
      },
      {
        name: 'Life Weaver',
        description: '+30% Healing, overhealing grants shields',
        statModifiers: { hp: 1.15, attack: 0.75, defense: 1.2, speed: 0.9, cheer: 1.1 },
      },
      {
        name: 'Transcendent Grace',
        description: 'Healing crits grant temporary invulnerability buff',
        statModifiers: { hp: 1.1, attack: 0.9, defense: 1.0, speed: 1.0, cheer: 1.3 },
      },
    ],
    ultimateSkill: {
      name: 'Divine Intervention',
      cheerCost: 50,
      effect: 'Heal all allies for 50% max HP, grant +20% damage for 5 seconds',
    },
    exclusiveRelics: ['minju_relic_blessing', 'minju_relic_regeneration'],
  },
  IROHA: {
    id: 'iroha',
    name: 'Iroha - Dancer',
    role: 'support',
    baseHP: 95,
    baseAttack: 90,
    baseDefense: 55,
    baseSpeed: 130,
    builds: [
      {
        name: 'Phantom Dancer',
        description: '+40% Speed, dodge attacks more easily',
        statModifiers: { hp: 0.85, attack: 0.95, defense: 0.7, speed: 1.4, cheer: 1.1 },
      },
      {
        name: 'Tempo Master',
        description: '+30% Attack Speed, attacks reduce cooldowns',
        statModifiers: { hp: 0.9, attack: 1.1, defense: 0.8, speed: 1.3, cheer: 1.2 },
      },
      {
        name: 'Rhythm Echo',
        description: 'Attacks grant stacking speed buffs to team',
        statModifiers: { hp: 1.0, attack: 1.05, defense: 0.9, speed: 1.2, cheer: 1.3 },
      },
    ],
    ultimateSkill: {
      name: 'Dance Revolution',
      cheerCost: 50,
      effect: 'Gain 100% dodge chance and +50% attack speed for 4 seconds',
    },
    exclusiveRelics: ['iroha_relic_speed', 'iroha_relic_unity'],
  },
  WONHEE: {
    id: 'wonhee',
    name: 'Wonhee - Controller',
    role: 'controller',
    baseHP: 105,
    baseAttack: 85,
    baseDefense: 60,
    baseSpeed: 80,
    builds: [
      {
        name: 'Crowd Master',
        description: '+50% crowd control duration, stun more often',
        statModifiers: { hp: 1.05, attack: 0.85, defense: 0.95, speed: 0.9, cheer: 1.2 },
      },
      {
        name: 'Chaos Weaver',
        description: '+35% CC duration, debuffs spread to nearby enemies',
        statModifiers: { hp: 1.0, attack: 1.0, defense: 1.0, speed: 1.0, cheer: 1.3 },
      },
      {
        name: 'Synchronous Flow',
        description: 'CC abilities grant team buffs, cheer generation +50%',
        statModifiers: { hp: 1.1, attack: 0.9, defense: 1.05, speed: 0.95, cheer: 1.5 },
      },
    ],
    ultimateSkill: {
      name: 'Perfect Sync',
      cheerCost: 50,
      effect: 'Stun all visible enemies for 3 seconds, grant team +30% defense',
    },
    exclusiveRelics: ['wonhee_relic_control', 'wonhee_relic_harmony'],
  },
};