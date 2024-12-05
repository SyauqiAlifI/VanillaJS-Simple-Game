import { isMobileDevice } from './utils/device.js';
import { getRelativeCanvasPosition } from './utils/canvas.js';

export class Joystick {
  constructor(canvas) {
    this.canvas = canvas;
    this.baseRadius = 50;
    this.stickRadius = 25;
    this.active = false;
    this.touchId = null;
    this.visible = false;
    this.baseX = 0;
    this.baseY = 0;
    this.stickX = 0;
    this.stickY = 0;

    if (isMobileDevice()) {
      this.setupTouchListeners();
    }
  }

  setupTouchListeners() {
    this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));
  }

  handleTouchStart(e) {
    if (this.active) return;

    const touch = e.touches[0];
    const pos = getRelativeCanvasPosition(this.canvas, touch.clientX, touch.clientY);

    // Create joystick at touch position
    this.baseX = pos.x;
    this.baseY = pos.y;
    this.stickX = pos.x;
    this.stickY = pos.y;
    
    this.active = true;
    this.visible = true;
    this.touchId = touch.identifier;
    e.preventDefault();
  }

  handleTouchMove(e) {
    if (!this.active) return;

    const touch = Array.from(e.touches).find(t => t.identifier === this.touchId);
    if (!touch) return;

    const pos = getRelativeCanvasPosition(this.canvas, touch.clientX, touch.clientY);
    const dx = pos.x - this.baseX;
    const dy = pos.y - this.baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= this.baseRadius) {
      this.stickX = pos.x;
      this.stickY = pos.y;
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
      this.visible = false;
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
    if (!this.visible) return;

    // Draw semi-transparent background overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw base circle with a glowing effect
    ctx.beginPath();
    ctx.arc(this.baseX, this.baseY, this.baseRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fill();
    
    // Add a subtle glow effect
    const gradient = ctx.createRadialGradient(
      this.baseX, this.baseY, this.baseRadius * 0.8,
      this.baseX, this.baseY, this.baseRadius
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.stroke();

    // Draw stick with a glowing effect
    ctx.beginPath();
    ctx.arc(this.stickX, this.stickY, this.stickRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fill();
    
    // Add glow to the stick
    const stickGradient = ctx.createRadialGradient(
      this.stickX, this.stickY, this.stickRadius * 0.5,
      this.stickX, this.stickY, this.stickRadius
    );
    stickGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    stickGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
    ctx.fillStyle = stickGradient;
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.stroke();
  }
}