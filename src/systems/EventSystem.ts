export interface GameEvent {
  id: string;
  title: string;
  description: string;
  options: EventOption[];
}

export interface EventOption {
  text: string;
  reward?: {
    type: 'gold' | 'health' | 'relic' | 'talent';
    amount: number;
    relicId?: string;
  };
  penalty?: {
    type: 'gold' | 'health' | 'ability';
    amount: number;
  };
}

export const GAME_EVENTS: GameEvent[] = [
  {
    id: 'event_shrine',
    title: 'Mysterious Shrine',
    description: 'A glowing shrine appears. What do you do?',
    options: [
      {
        text: 'Make an offering',
        reward: { type: 'talent', amount: 1 },
      },
      {
        text: 'Ignore it',
        reward: { type: 'gold', amount: 50 },
      },
    ],
  },
  {
    id: 'event_merchant',
    title: 'Traveling Merchant',
    description: 'A mysterious merchant appears with rare items.',
    options: [
      {
        text: 'Buy rare relic (cost: 200 gold)',
        reward: { type: 'relic', amount: 1, relicId: 'neon_light_stick' },
        penalty: { type: 'gold', amount: 200 },
      },
      {
        text: 'Decline and move on',
        reward: { type: 'gold', amount: 100 },
      },
    ],
  },
  {
    id: 'event_ambush',
    title: 'Unexpected Ambush!',
    description: 'Enemies surround you! Choose how to respond.',
    options: [
      {
        text: 'Fight your way through',
        reward: { type: 'gold', amount: 300 },
        penalty: { type: 'health', amount: 30 },
      },
      {
        text: 'Attempt to flee',
        reward: { type: 'gold', amount: 50 },
      },
    ],
  },
];

export class EventSystem {
  static selectRandomEvent(): GameEvent {
    return GAME_EVENTS[Math.floor(Math.random() * GAME_EVENTS.length)];
  }

  static getEventById(id: string): GameEvent | undefined {
    return GAME_EVENTS.find((e) => e.id === id);
  }
}