const DEVICE_PIXEL_RATIO = window.devicePixelRatio;
const body = document.body;

let screenWidth;
let screenHeight;
let mouseX;
let mouseY;

function createCanvas() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  context.imageSmoothingQuality = 'high'
  context.imageSmoothingEnabled = true;
  context.translate(0.5, 0.5);

  canvas.context = context;

  return canvas;
}

const canvas = createCanvas();
const context = canvas.context;

function onMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

let onResizeDrawDebounce;
function onResize(initial) {
  screenWidth = body.clientWidth;
  screenHeight = body.clientHeight;

  canvas.width = screenWidth * DEVICE_PIXEL_RATIO;
  canvas.height = screenHeight * DEVICE_PIXEL_RATIO;

  canvas.style.width = screenWidth + 'px';
  canvas.style.height = screenHeight + 'px';

  context.scale(DEVICE_PIXEL_RATIO, DEVICE_PIXEL_RATIO);

  if (initial === true) {
    return;
  }

  clearTimeout(onResizeDrawDebounce);
  onResizeDrawDebounce = setTimeout(draw, 300);
}

function draw() {
  context.clearRect(0, 0, screenWidth, screenHeight);

  // drawBilinearInterpolationExample();
  drawLinearInterpolationExample();

  console.log('redrawed');
}

onResize(true);
draw();

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('resize', onResize);
body.appendChild(canvas);
