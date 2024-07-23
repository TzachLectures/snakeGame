import { Game } from "./classes/Game";

const canvas = document.getElementById("app") as HTMLCanvasElement;
canvas.width = 400;
canvas.height = 400;

const game = new Game(canvas, 20);

document.addEventListener("keydown", (event: KeyboardEvent) => {
  game.handleInput(event.key);
});

game.start();
