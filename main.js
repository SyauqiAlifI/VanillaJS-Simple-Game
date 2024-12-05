import './style.css';
import { Game } from './src/game/game.js';

const canvas = document.getElementById('gameCanvas');
const game = new Game(canvas);
game.gameLoop();