export interface Talent {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic';
  effect: (character: any) => void;
}

export const AVAILABLE_TALENTS: Talent[] = [
  {
    id: 'talent_crit_chance',
    name: '+15% Critical Strike Chance',
    description: 'Increase critical strike chance by 15%',
    rarity: 'common',
    effect: (char) => {
      char.stats.critChance = (char.stats.critChance || 0.15) + 0.15;
    },
  },
  {
    id: 'talent_lifesteal',
    name: 'Lifesteal +20%',
    description: 'Heal 20% of damage dealt',
    rarity: 'rare',
    effect: (char) => {
      char.stats.lifesteal = (char.stats.lifesteal || 0) + 0.2;
    },
  },
  {
    id: 'talent_thorns',
    name: 'Thorns Aura',
    description: 'Reflect 25% of damage taken to attackers',
    rarity: 'rare',
    effect: (char) => {
      char.stats.reflectDamage = (char.stats.reflectDamage || 0) + 0.25;
    },
  },
  {
    id: 'talent_haste',
    name: '+20% Attack Speed',
    description: 'Increase attack speed by 20%',
    rarity: 'common',
    effect: (char) => {
      char.stats.speed = char.stats.speed * 1.2;
    },
  },
  {
    id: 'talent_armor',
    name: '+25% Defense',
    description: 'Increase defense by 25%',
    rarity: 'common',
    effect: (char) => {
      char.stats.defense = char.stats.defense * 1.25;
    },
  },
  {
    id: 'talent_cheer_boost',
    name: '+30% Cheer Generation',
    description: 'Generate 30% more cheer from attacks',
    rarity: 'epic',
    effect: (char) => {
      char.stats.cheerGeneration = (char.stats.cheerGeneration || 1.0) * 1.3;
    },
  },
  {
    id: 'talent_second_wind',
    name: 'Second Wind',
    description: 'Heal 15% max HP every 10 seconds',
    rarity: 'epic',
    effect: (char) => {
      char.stats.regenPerSecond = (char.stats.regenPerSecond || 0) + 0.015;
    },
  },
];

export class TalentSystem {
  static selectRandomTalents(count: number = 3): Talent[] {
    const shuffled = [...AVAILABLE_TALENTS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  static applyTalent(talent: Talent, character: any): void {
    talent.effect(character);
  }
}