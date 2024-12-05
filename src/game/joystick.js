export class Joystick {
  constructor(canvas) {
    this.canvas = canvas;
    this.baseX = 400;
    this.baseY = canvas.height + 350;
    this.stickX = this.baseX;
    this.stickY = this.baseY;
    this.baseRadius = 50;
    this.stickRadius = 25;
    this.active = false;
    this.touchId = null;

    this.setupTouchListeners();
  }

  setupTouchListeners() {
    this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));
  }

  handleTouchStart(e) {
    if (this.active) return;

    const touch = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const distance = Math.sqrt(
      Math.pow(x - this.baseX, 2) + 
      Math.pow(y - this.baseY, 2)
    );

    if (distance <= this.baseRadius) {
      this.active = true;
      this.touchId = touch.identifier;
      this.stickX = x;
      this.stickY = y;
      e.preventDefault();
    }
  }

  handleTouchMove(e) {
    if (!this.active) return;

    const touch = Array.from(e.touches).find(t => t.identifier === this.touchId);
    if (!touch) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const dx = x - this.baseX;
    const dy = y - this.baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= this.baseRadius) {
      this.stickX = x;
      this.stickY = y;
    } else {
      const angle = Math.atan2(dy, dx);
      this.stickX = this.baseX + Math.cos(angle) * this.baseRadius;
      this.stickY = this.baseY + Math.sin(angle) * this.baseRadius;
    }

    e.preventDefault();
  }

  handleTouchEnd(e) {
    if (!this.active) return;

    const touches = Array.from(e.touches);
    if (!touches.some(t => t.identifier === this.touchId)) {
      this.active = false;
      this.touchId = null;
      this.stickX = this.baseX;
      this.stickY = this.baseY;
    }
  }

  getInput() {
    if (!this.active) return { x: 0, y: 0 };

    const dx = this.stickX - this.baseX;
    const dy = this.stickY - this.baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 0.1) return { x: 0, y: 0 };

    return {
      x: dx / this.baseRadius,
      y: dy / this.baseRadius
    };
  }

  draw(ctx) {
    // Draw base circle
    ctx.beginPath();
    ctx.arc(this.baseX, this.baseY, this.baseRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.stroke();

    // Draw stick
    ctx.beginPath();
    ctx.arc(this.stickX, this.stickY, this.stickRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.stroke();
  }
}