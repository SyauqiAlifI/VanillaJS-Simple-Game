export function getCanvasScale(canvas) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return Math.min(width / canvas.width, height / canvas.height);
}

export function getRelativeCanvasPosition(canvas, clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const scale = getCanvasScale(canvas);
  
  return {
    x: (clientX - rect.left) / scale,
    y: (clientY - rect.top) / scale
  };
}