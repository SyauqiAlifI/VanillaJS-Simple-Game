export class Resource {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // 'food' or 'water'
    this.size = 20;
  }

  draw(ctx) {
    ctx.fillStyle = this.type === 'food' ? 'brown' : 'blue';
    ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
  }

  checkCollision(player) {
    const distance = Math.sqrt(
      Math.pow(this.x - player.x, 2) + 
      Math.pow(this.y - player.y, 2)
    );
    return distance < 30;
  }
}