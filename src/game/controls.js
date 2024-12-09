import { isMobileDevice } from './utils/device.js';

export class Controls {
  constructor(joystick) {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.joystick = joystick;
    
    if (!isMobileDevice()) {
      this.setupKeyboardListeners();
    }
  }

  setupKeyboardListeners() {
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    window.addEventListener('keyup', (e) => this.handleKeyUp(e));
  }

  handleKeyDown(e) {
    switch(e.key) {
      case 'ArrowUp':
      case 'w':
        this.up = true;
        break;
      case 'ArrowDown':
      case 's':
        this.down = true;
        break;
      case 'ArrowLeft':
      case 'a':
        this.left = true;
        break;
      case 'ArrowRight':
      case 'd':
        this.right = true;
        break;
    }
  }

  handleKeyUp(e) {
    switch(e.key) {
      case 'ArrowUp':
      case 'w':
        this.up = false;
        break;
      case 'ArrowDown':
      case 's':
        this.down = false;
        break;
      case 'ArrowLeft':
      case 'a':
        this.left = false;
        break;
      case 'ArrowRight':
      case 'd':
        this.right = false;
        break;
    }
  }

  getInput() {
    // Check keyboard input
    if (this.up || this.down || this.left || this.right) {
      return {
        x: (this.right ? 1 : 0) - (this.left ? 1 : 0),
        y: (this.down ? 1 : 0) - (this.up ? 1 : 0)
      };
    }

    // Use joystick input
    return this.joystick.getInput();
  }
}