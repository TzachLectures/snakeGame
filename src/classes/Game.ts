import { Direction } from "../types";
import { Food } from "./Food";
import { Snake } from "./Snake";

export class Game {
  snake: Snake;
  food: Food;
  gameOver: boolean;
  score: number;
  gridSize: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  intervalId: number | null;

  constructor(canvas: HTMLCanvasElement, gridSize: number = 20) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.gridSize = gridSize;
    this.gameOver = false;
    this.score = 0;
    this.intervalId = null;
    let middle: number = this.gridSize ** 2 / 2;
    this.snake = new Snake({ x: middle, y: middle });
    this.food = new Food(gridSize, this.snake.body);
  }

  start(): void {
    this.intervalId = setInterval(() => {
      this.update();
    }, 100); // Update every 100 milliseconds
  }

  update(): void {
    if (this.gameOver) {
      if (this.intervalId) clearInterval(this.intervalId);
      console.log("Game Over!");
      return;
    }

    this.snake.move();

    // Check if food is eaten
    if (
      this.snake.body[0].x === this.food.x &&
      this.snake.body[0].y === this.food.y
    ) {
      this.snake.grow();
      this.food.respawn(this.gridSize, this.snake.body);
      this.score += 10;
    }

    // Check for game over
    if (this.snake.checkCollision(this.gridSize * this.gridSize)) {
      this.gameOver = true;
    }

    this.draw();
  }

  draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.food.draw(this.ctx);
    this.snake.draw(this.ctx);
  }

  handleInput(key: string): void {
    console.log(key);

    switch (key) {
      case "ArrowUp":
        this.snake.turn(Direction.Up);
        break;
      case "ArrowDown":
        this.snake.turn(Direction.Down);
        break;
      case "ArrowLeft":
        this.snake.turn(Direction.Left);
        break;
      case "ArrowRight":
        this.snake.turn(Direction.Right);
        break;
      case "Enter":
        this.reset();
        break;
    }
  }

  reset(): void {
    this.gameOver = false;
    this.score = 0;
    this.snake = new Snake({ x: this.gridSize, y: this.gridSize });
    this.food.respawn(this.gridSize, this.snake.body);
    this.start();
  }
}
