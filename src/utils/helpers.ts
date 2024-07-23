import { Direction } from "../types";

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getOpositeDirection(dir: Direction): Direction {
  switch (dir) {
    case Direction.Right:
      return Direction.Left;
    case Direction.Left:
      return Direction.Right;
    case Direction.Up:
      return Direction.Down;
    case Direction.Down:
      return Direction.Up;
    default:
      return Direction.Right;
      break;
  }
}
