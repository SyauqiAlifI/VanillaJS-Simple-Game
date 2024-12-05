import { Player } from './player.js';
import { Controls } from './controls.js';
import { Resource } from './resources.js';
import { UI } from './ui.js';
import { Joystick } from './joystick.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.joystick = new Joystick(canvas);
    this.player = new Player();
    this.controls = new Controls(this.joystick);
    this.ui = new UI(canvas);
    this.resources = [];
    this.gameOver = false;

    this.setupCanvas();
    this.spawnResources();
    this.setupMobileViewport();
  }

  setupCanvas() {
    this.canvas.width = 800;
    this.canvas.height = 600;
  }

  setupMobileViewport() {
    const updateCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scale = Math.min(width / 800, height / 600);
      
      this.canvas.style.width = `${800 * scale}px`;
      this.canvas.style.height = `${600 * scale}px`;
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
  }

  spawnResources() {
    for (let i = 0; i < 5; i++) {
      this.resources.push(
        new Resource(
          Math.random() * this.canvas.width,
          Math.random() * this.canvas.height,
          Math.random() < 0.5 ? 'food' : 'water'
        )
      );
    }
  }

  update() {
    if (this.gameOver) return;

    this.player.update(this.controls);

    // Check resource collection
    this.resources = this.resources.filter(resource => {
      if (resource.checkCollision(this.player)) {
        if (resource.type === 'food') {
          this.player.hunger = Math.min(100, this.player.hunger + 30);
        } else {
          this.player.thirst = Math.min(100, this.player.thirst + 30);
        }
        return false;
      }
      return true;
    });

    // Spawn new resources if needed
    if (this.resources.length < 5) {
      this.resources.push(
        new Resource(
          Math.random() * this.canvas.width,
          Math.random() * this.canvas.height,
          Math.random() < 0.5 ? 'food' : 'water'
        )
      );
    }

    // Check game over condition
    if (this.player.health <= 0) {
      this.gameOver = true;
    }
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = '#242424';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw game elements
    this.resources.forEach(resource => resource.draw(this.ctx));
    this.player.draw(this.ctx);
    this.ui.draw(this.ctx, this.player);
    this.joystick.draw(this.ctx);

    if (this.gameOver) {
      this.ctx.fillStyle = 'white';
      this.ctx.font = '48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Game Over', this.canvas.width/2, this.canvas.height/2);
    }
  }

  gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }
}