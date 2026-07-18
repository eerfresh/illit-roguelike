export class InputHandler {
  private keys: { [key: string]: boolean } = {};
  private mousePosition: { x: number; y: number } = { x: 0, y: 0 };
  private mouseDown: boolean = false;

  constructor(scene: Phaser.Scene) {
    scene.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      this.keys[event.key.toLowerCase()] = true;
    });

    scene.input.keyboard?.on('keyup', (event: KeyboardEvent) => {
      this.keys[event.key.toLowerCase()] = false;
    });

    scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.mousePosition = { x: pointer.x, y: pointer.y };
    });

    scene.input.on('pointerdown', () => {
      this.mouseDown = true;
    });

    scene.input.on('pointerup', () => {
      this.mouseDown = false;
    });
  }

  isKeyPressed(key: string): boolean {
    return this.keys[key.toLowerCase()] || false;
  }

  getMousePosition(): { x: number; y: number } {
    return this.mousePosition;
  }

  isMouseDown(): boolean {
    return this.mouseDown;
  }

  getMovementVector(): { x: number; y: number } {
    const x =
      (this.isKeyPressed('d') || this.isKeyPressed('arrowright') ? 1 : 0) -
      (this.isKeyPressed('a') || this.isKeyPressed('arrowleft') ? 1 : 0);

    const y =
      (this.isKeyPressed('s') || this.isKeyPressed('arrowdown') ? 1 : 0) -
      (this.isKeyPressed('w') || this.isKeyPressed('arrowup') ? 1 : 0);

    return { x, y };
  }
}