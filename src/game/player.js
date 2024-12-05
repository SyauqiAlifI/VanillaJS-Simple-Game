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
    // Movement
    if (controls.up) this.y -= this.speed;
    if (controls.down) this.y += this.speed;
    if (controls.left) this.x -= this.speed;
    if (controls.right) this.x += this.speed;

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