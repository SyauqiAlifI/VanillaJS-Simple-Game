export class UI {
  constructor(canvas) {
    this.canvas = canvas;
  }

  draw(ctx, player) {
    // Draw status bars
    this.drawStatusBar(ctx, 20, 20, player.health, 'Health', 'red');
    this.drawStatusBar(ctx, 20, 50, player.hunger, 'Hunger', 'brown');
    this.drawStatusBar(ctx, 20, 80, player.thirst, 'Thirst', 'blue');
  }

  drawStatusBar(ctx, x, y, value, label, color) {
    const width = 200;
    const height = 20;

    // Draw background
    ctx.fillStyle = '#333';
    ctx.fillRect(x, y, width, height);

    // Draw value
    ctx.fillStyle = color;
    ctx.fillRect(x, y, (width * Math.max(0, value) / 100), height);

    // Draw text
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.fillText(`${label}: ${Math.floor(value)}`, x + 5, y + 15);
  }
}