// 立方体がくるくる回転しますー
function setup() {
  createCanvas(100, 100, WEBGL);
}

function draw() {
  background(0);
  noFill();
  stroke(100, 100, 240);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(45, 45, 45);
}
