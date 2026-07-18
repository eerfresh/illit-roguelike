# ILLIT Roguelike - Kpop Concert Dungeon Game

**A top-down 2D roguelike fan game themed around ILLIT K-pop concert dungeons**

## About

This is a non-profit, original fan art-based roguelike dungeon game built with Phaser 3. Experience a neon-pink holographic concert aesthetic while battling corrupted musical note monsters.

## Features

### Core Game Loop
- **Procedural Dungeon Generation**: Each floor is randomly generated with variety
- **Permadeath Mechanic**: True roguelike experience with permanent character death
- **Room Types**: Battle rooms, shops, healing sanctuaries, random events, and boss encounters
- **Multi-Floor Progression**: 7 floors culminating in an epic boss battle

### Playable Characters (5 Unique Idols)
1. **Yunah - Captain Tank**: High HP and defense
   - Guardian, Aegis Warden, Radiant Shield builds
   
2. **Moka - Vocalist Damage Dealer**: High attack and projectile focus
   - Sharpshooter, Burst Maestro, Harmonic Echo builds
   
3. **Minju - Healer Support**: Healing and team buffs
   - Celestial Mender, Life Weaver, Transcendent Grace builds
   
4. **Iroha - Dancer Speed/Support**: Ultra-fast movement and dodging
   - Phantom Dancer, Tempo Master, Rhythm Echo builds
   
5. **Wonhee - Crowd Control**: Crowd control and enemy debuffs
   - Crowd Master, Chaos Weaver, Synchronous Flow builds

### Progression Systems
- **Relic & Talent System**: Collect kpop merch-themed relics and floor-based talents
- **Cheer Meter**: Build up ultimate abilities through combat
- **Inventory Management**: Strategic relic loadouts
- **Unlock Collection**: Track unlocked characters and achievements

### Combat
- **WASD Movement**: Direct character control
- **Mouse Attack**: Point and click targeting
- **Q/E Ultimate Skills**: Unique abilities for each character
- **Team Ensemble Bursts**: Cheer meter for powerful abilities

### Aesthetic
- **Neon Pink-Blue Holographic**: Concert-inspired visual theme
- **Sequin Glitter Particle VFX**: Eye-catching special effects
- **K-pop Chart Style UI**: Themed interface design
- **Song-Based Stages**: Floors themed around ILLIT songs (Magnetic, Lucky Girl, Cherish)

## Project Structure

```
src/
├── main.ts              # Entry point
├── config/              # Game configuration
│   ├── gameConfig.ts
│   ├── characters.ts
│   └── relics.ts
├── scenes/              # Game scenes (Boot, Menu, DungeonFloor, etc)
├── entities/            # Player, Enemy, Boss classes
├── systems/             # Core systems (Combat, Dungeon Gen, Inventory, etc)
├── ui/                  # HUD and UI components
├── assets/              # Graphics, sounds (original fan art)
└── utils/               # Helper utilities
```

## Tech Stack

- **Phaser 3**: Game engine
- **TypeScript**: Type-safe development
- **Webpack**: Module bundling
- **Original Fanart**: All assets are original fan creations

## Copyright Notice

**Non-Profit Fan Work Disclaimer**: This is a fan-created work with original assets and is not affiliated with or endorsed by ILLIT or its management. No copyrighted material is used.

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:8080` to play!

## Development Notes

Focusing on core game loop first, then visual polish and particle effects.
