const DEVICE_PIXEL_RATIO = window.devicePixelRatio;
const body = document.body;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

context.imageSmoothingQuality = 'high'
context.imageSmoothingEnabled = true;
context.translate(0.5, 0.5);

function onMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

let onResizeDrawDebounce;
function onResize(redraw) {
  screenWidth = body.clientWidth;
  screenHeight = body.clientHeight;

  canvas.width = screenWidth * DEVICE_PIXEL_RATIO;
  canvas.height = screenHeight * DEVICE_PIXEL_RATIO;

  canvas.style.width = screenWidth + 'px';
  canvas.style.height = screenHeight + 'px';

  context.scale(DEVICE_PIXEL_RATIO, DEVICE_PIXEL_RATIO);

  if (redraw) {
    clearTimeout(onResizeDrawDebounce);
    onResizeDrawDebounce = setTimeout(draw, 300);
  }
}

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('resize', () => onResize(true));

body.appendChild(canvas);
