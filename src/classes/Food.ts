import { getRandomInt } from "../utils/helpers";

export class Food {
  x: number = 0;
  y: number = 0;
  size: number = 20;

  constructor(grideSize: number, snakePositions: { x: number; y: number }[]) {
    this.respawn(grideSize, snakePositions);
  }

  respawn(grideSize: number, snakePositions: { x: number; y: number }[]): void {
    let isOccupied: boolean = true;
    while (isOccupied === true) {
      this.x = getRandomInt(0, grideSize) * this.size;
      this.y = getRandomInt(0, grideSize) * this.size;
      isOccupied = false;
      snakePositions.forEach((point) => {
        if (point.x === this.x && point.y === this.y) {
          isOccupied = true;
        }
      });
    }
  }

  draw(canvasContext: CanvasRenderingContext2D): void {
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(this.x, this.y, this.size, this.size);
  }
}
