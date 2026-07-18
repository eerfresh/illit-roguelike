import { GAME_CONFIG } from '../config/gameConfig';

export interface DungeonRoom {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  connected: boolean;
  enemyCount?: number;
  songTheme?: string;
}

export class DungeonGenerator {
  private seed: number;
  private rooms: DungeonRoom[] = [];

  constructor(seed: number) {
    this.seed = seed;
  }

  private seededRandom(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  generateFloor(floorNumber: number): DungeonRoom[] {
    this.rooms = [];
    const roomCount = 3 + Math.floor(floorNumber * 0.5);

    this.binarySpacePartition(
      0,
      0,
      GAME_CONFIG.FLOOR_WIDTH,
      GAME_CONFIG.FLOOR_HEIGHT,
      roomCount
    );

    this.assignRoomTypes(floorNumber);
    this.connectRooms();

    return this.rooms;
  }

  private binarySpacePartition(
    x: number,
    y: number,
    width: number,
    height: number,
    count: number
  ) {
    if (count <= 1 || width < 8 || height < 8) {
      this.rooms.push({
        type: 'unassigned',
        x: x + 1,
        y: y + 1,
        width: Math.max(4, width - 2),
        height: Math.max(4, height - 2),
        connected: false,
      });
      return;
    }

    const horizontal = this.seededRandom() > 0.5;
    let splitPos: number;

    if (horizontal) {
      splitPos = Math.floor(height / 2) + Math.floor((this.seededRandom() - 0.5) * height * 0.3);
      this.binarySpacePartition(x, y, width, splitPos, Math.floor(count / 2));
      this.binarySpacePartition(x, y + splitPos, width, height - splitPos, Math.ceil(count / 2));
    } else {
      splitPos = Math.floor(width / 2) + Math.floor((this.seededRandom() - 0.5) * width * 0.3);
      this.binarySpacePartition(x, y, splitPos, height, Math.floor(count / 2));
      this.binarySpacePartition(x + splitPos, y, width - splitPos, height, Math.ceil(count / 2));
    }
  }

  private assignRoomTypes(floorNumber: number) {
    const floorSongMap: Record<number, string> = {
      1: 'magnetic',
      2: 'lucky_girl',
      3: 'cherish',
      4: 'magnetic',
      5: 'lucky_girl',
      6: 'cherish',
      7: 'boss',
    };

    const songTheme = floorSongMap[floorNumber] || 'magnetic';

    this.rooms.forEach((room, index) => {
      if (floorNumber === 7) {
        room.type = GAME_CONFIG.ROOM_TYPES.BOSS;
      } else if (index === this.rooms.length - 1) {
        room.type = GAME_CONFIG.ROOM_TYPES.SHOP;
      } else if (this.seededRandom() < 0.2) {
        room.type = GAME_CONFIG.ROOM_TYPES.HEALING;
      } else if (this.seededRandom() < 0.15) {
        room.type = GAME_CONFIG.ROOM_TYPES.EVENT;
      } else if (this.seededRandom() < 0.1) {
        room.type = GAME_CONFIG.ROOM_TYPES.TREASURE;
      } else {
        room.type = GAME_CONFIG.ROOM_TYPES.BATTLE;
        room.enemyCount = 2 + Math.floor(floorNumber * 0.5);
      }
      room.songTheme = songTheme;
    });
  }

  private connectRooms() {
    for (let i = 0; i < this.rooms.length - 1; i++) {
      this.rooms[i].connected = true;
      this.rooms[i + 1].connected = true;
    }
  }
}