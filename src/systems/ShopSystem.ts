import { RELICS } from '../config/relics';

export interface ShopItem {
  relicId: string;
  price: number;
  quantity: number;
}

export class ShopSystem {
  private shopItems: ShopItem[] = [];
  private goldAmount: number = 0;

  generateShop(floorNumber: number): ShopItem[] {
    this.shopItems = [];
    const itemCount = 3 + Math.floor(floorNumber / 2);
    const relicIds = Object.keys(RELICS);

    for (let i = 0; i < itemCount; i++) {
      const randomRelic = relicIds[Math.floor(Math.random() * relicIds.length)];
      const relic = RELICS[randomRelic];
      
      let basePrice = 100;
      if (relic.rarity === 'rare') basePrice = 250;
      if (relic.rarity === 'epic') basePrice = 500;
      if (relic.rarity === 'legendary') basePrice = 1000;

      const price = Math.floor(basePrice * (1 + floorNumber * 0.2));

      this.shopItems.push({
        relicId: randomRelic,
        price,
        quantity: 1,
      });
    }

    return this.shopItems;
  }

  getShopItems(): ShopItem[] {
    return this.shopItems;
  }

  buyItem(relicId: string, gold: number): boolean {
    const item = this.shopItems.find((i) => i.relicId === relicId);
    if (!item) return false;

    if (gold >= item.price) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.shopItems = this.shopItems.filter((i) => i.relicId !== relicId);
      }
      return true;
    }
    return false;
  }

  setGold(amount: number) {
    this.goldAmount = amount;
  }

  getGold(): number {
    return this.goldAmount;
  }
}