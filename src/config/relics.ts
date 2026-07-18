export interface Relic {
  id: string;
  name: string;
  description: string;
  type: 'general' | 'character-exclusive';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  effect: (stats: any) => any;
  characterId?: string;
}

export const RELICS: Record<string, Relic> = {
  // General Kpop Merch Relics
  glitter_bracelet: {
    id: 'glitter_bracelet',
    name: 'Glitter Bracelet',
    description: '+10% All Stats',
    type: 'general',
    rarity: 'common',
    effect: (stats) => ({
      ...stats,
      hp: stats.hp * 1.1,
      attack: stats.attack * 1.1,
      defense: stats.defense * 1.1,
      speed: stats.speed * 1.1,
    }),
  },
  concert_ticket: {
    id: 'concert_ticket',
    name: 'Concert Ticket',
    description: '+25% Cheer Generation',
    type: 'general',
    rarity: 'rare',
    effect: (stats) => ({ ...stats, cheerGeneration: stats.cheerGeneration * 1.25 }),
  },
  hologram_earring: {
    id: 'hologram_earring',
    name: 'Hologram Earring',
    description: '+20% Attack Speed, +15% Dodge Chance',
    type: 'general',
    rarity: 'rare',
    effect: (stats) => ({
      ...stats,
      speed: stats.speed * 1.2,
      dodgeChance: (stats.dodgeChance || 0) + 0.15,
    }),
  },
  sequin_jacket: {
    id: 'sequin_jacket',
    name: 'Sequin Jacket',
    description: '+30% Defense, Reflect 15% damage taken',
    type: 'general',
    rarity: 'epic',
    effect: (stats) => ({
      ...stats,
      defense: stats.defense * 1.3,
      reflectDamage: (stats.reflectDamage || 0) + 0.15,
    }),
  },
  neon_light_stick: {
    id: 'neon_light_stick',
    name: 'Neon Light Stick',
    description: '+35% Cheer from all sources, Ultimate costs -20%',
    type: 'general',
    rarity: 'epic',
    effect: (stats) => ({
      ...stats,
      cheerGeneration: stats.cheerGeneration * 1.35,
      ultimateCostReduction: 0.2,
    }),
  },
  yunah_relic_fortress: {
    id: 'yunah_relic_fortress',
    name: "Yunah's Fortress Core",
    description: '+25% HP, taunt generation +100%',
    type: 'character-exclusive',
    rarity: 'legendary',
    characterId: 'yunah',
    effect: (stats) => ({
      ...stats,
      hp: stats.hp * 1.25,
      tauntGeneration: (stats.tauntGeneration || 1.0) * 2.0,
    }),
  },
  moka_relic_precision: {
    id: 'moka_relic_precision',
    name: "Moka's Perfect Aim",
    description: '+35% Attack, Projectiles +20% speed',
    type: 'character-exclusive',
    rarity: 'legendary',
    characterId: 'moka',
    effect: (stats) => ({
      ...stats,
      attack: stats.attack * 1.35,
      projectileSpeed: (stats.projectileSpeed || 1.0) * 1.2,
    }),
  },
  minju_relic_blessing: {
    id: 'minju_relic_blessing',
    name: "Minju's Divine Blessing",
    description: '+40% Healing Power, +15% Max HP',
    type: 'character-exclusive',
    rarity: 'legendary',
    characterId: 'minju',
    effect: (stats) => ({
      ...stats,
      healingPower: (stats.healingPower || 1.0) * 1.4,
      hp: stats.hp * 1.15,
    }),
  },
  iroha_relic_speed: {
    id: 'iroha_relic_speed',
    name: "Iroha's Velocity Core",
    description: '+45% Speed, Dodge chance +25%',
    type: 'character-exclusive',
    rarity: 'legendary',
    characterId: 'iroha',
    effect: (stats) => ({
      ...stats,
      speed: stats.speed * 1.45,
      dodgeChance: (stats.dodgeChance || 0) + 0.25,
    }),
  },
  wonhee_relic_control: {
    id: 'wonhee_relic_control',
    name: "Wonhee's Perfect Sync",
    description: '+50% Crowd Control Duration, +20% Crowd Control Power',
    type: 'character-exclusive',
    rarity: 'legendary',
    characterId: 'wonhee',
    effect: (stats) => ({
      ...stats,
      ccDuration: (stats.ccDuration || 1.0) * 1.5,
      ccPower: (stats.ccPower || 1.0) * 1.2,
    }),
  },
};