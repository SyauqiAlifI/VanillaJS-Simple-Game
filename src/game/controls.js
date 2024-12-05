export class Controls {
  constructor() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.setupListeners();
  }

  setupListeners() {
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
}