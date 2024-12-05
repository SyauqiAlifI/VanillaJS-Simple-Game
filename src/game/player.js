export class Player {
  constructor() {
    this.health = 100;
    this.hunger = 100;
    this.thirst = 100;
    this.x = 400;
    this.y = 300;
    this.speed = 5;
  }

  update(controls) {
    // Get input from controls
    const input = controls.getInput();
    
    // Update position based on input
    this.x += input.x * this.speed;
    this.y += input.y * this.speed;

    // Status effects
    this.hunger -= 0.02;
    this.thirst -= 0.03;
    
    if (this.hunger <= 0 || this.thirst <= 0) {
      this.health -= 0.05;
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x - 20, this.y - 20, 40, 40);
  }
}