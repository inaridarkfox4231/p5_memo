/**
* Hypotrochoid.
*/
'use strict';
const SKETCH_NAME = 'Hypotrochoid';
// ---- variables
let backgroundColor;
let rc;
let rm;
let rd;
let d;
let rcNoiseOffset;
let rmNoiseOffset;
let rdNoiseOffset;

// ---- functions
function reset(){
  rcNoiseOffset = random(1000);
  rmNoiseOffset = random(1000);
  rdNoiseOffset = random(1000);
}

function preload(){
}

function setup(){
  createCanvas(640, 640);
  stroke(0, 160);
  noFill();
  backgroundColor = color(252);
  reset();
}

function draw(){
  background(backgroundColor);
  translate(320, 320); // 原点を中心に持ってくる
  rc = 3 + 6 * noise(rcNoiseOffset + frameCount * 0.0005);
  rm = 1 + 6 * noise(rmNoiseOffset + frameCount * 0.0005);
  rd = 3 + 6 * noise(rdNoiseOffset + frameCount * 0.01);
  d = rc - rm;
  beginShape();
  for(let i = 0, len = 360 * 30; i < len; i += 1){
    const t = QUARTER_PI + TWO_PI * i / 360;
    const x = d * cos(t) + rd * cos(t * d / rm);
    const y = d * sin(t) + rd * sin(t * d / rm);
    vertex(30 * x, 30 * y);
  }
  endShape();
}

function mousePressed(){
  reset();
}

function keyTyped(){
  if(keyCode === ENTER){
    noLoop();
  }
}
/*
(function(p5ex){
  'use strict';

  const SKETCH_NAME = 'Hypotrochoid';
  const sketch = (p) => {
    // ---- variables
    let backgroundColor;
    let rc;
    let rm;
    let rd;
    let d;
    let rcNoiseOffset;
    let rmNoiseOffset;
    let rdNoiseOffset;
    // ---- functions
    function reset(){
      rcNoiseOffset = p.random(1000);
      rmNoiseOffset = p.random(1000);
      rdNoiseOffset = p.random(1000);
    }
    // ---- Setup & Draw etc.
    p.preload = () => {
    };
    p.setup = () => {
      p.createScalableCanvas(p5ex.ScalableCanvasTypes.SQUARE640x640);
      p.scalableCanvas.scale();
      p.translate(320, 320);
      rc = 3 + 6 * p.noise(rcNoiseOffset + p.frameCount * 0.0005);
      rm = 1 + 6 * p.noise(rmNoiseOffset + p.frameCount * 0.0005);
      rd = 3 + 6 * p.noise(rdNoiseOffset + p.frameCount * 0.01);
      d = rc - rm;
      p.beginShape();
      for(let i = 0, len = 360 * 30; i < len; i += 1){
        const t = -p.QUARTER_PI + p.TWO_PI * i / 360;
        const x = d * Math.cos(t) + rd * Math.cos(t * d / rm);
        const y = d * Math.sin(t) - rd * Math.sin(t * d / rm);
        p.vertex(30 * x, 30 * y);
      }
      p.endShape();
      p.scalableCanvas.cancelScale();
    };
    p.windowResized = ()=> {
    };
    p.mousePressed = () => {
      // if (!p5ex.mouseIsInCanvas(p)) return;
      // p.noLoop();
      reset();
    };
    p.keyTyped = () => {
      if(p.keyCode === p.ENTER){
        p.noLoop();
      }
    };
  };
  new p5ex.p5exClass(sketch, SKETCH_NAME);
}(p5ex));*/
