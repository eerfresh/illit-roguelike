import { Relic, RELICS } from '../config/relics';

export interface InventorySlot {
  relic: Relic;
  quantity: number;
}

export class InventorySystem {
  private slots: Map<string, InventorySlot> = new Map();
  private maxSlots: number = 12;

  addRelic(relicId: string, quantity: number = 1): boolean {
    const relic = RELICS[relicId];
    if (!relic) return false;

    if (this.slots.has(relicId)) {
      const slot = this.slots.get(relicId)!;
      slot.quantity += quantity;
    } else {
      if (this.slots.size >= this.maxSlots) {
        return false;
      }
      this.slots.set(relicId, { relic, quantity });
    }
    return true;
  }

  removeRelic(relicId: string, quantity: number = 1): boolean {
    if (!this.slots.has(relicId)) return false;

    const slot = this.slots.get(relicId)!;
    slot.quantity -= quantity;

    if (slot.quantity <= 0) {
      this.slots.delete(relicId);
    }
    return true;
  }

  getInventory(): InventorySlot[] {
    return Array.from(this.slots.values());
  }

  getEquippedRelics(): Relic[] {
    return Array.from(this.slots.values())
      .filter((slot) => slot.quantity > 0)
      .map((slot) => slot.relic);
  }

  calculateStats(baseStats: any): any {
    let modifiedStats = { ...baseStats };

    this.getEquippedRelics().forEach((relic) => {
      modifiedStats = relic.effect(modifiedStats);
    });

    return modifiedStats;
  }

  isFull(): boolean {
    return this.slots.size >= this.maxSlots;
  }

  getSlotCount(): number {
    return this.slots.size;
  }
}