// High speed random walk の写経
"use strict";
p5.disableFriendlyErrors = true;
const IDEAL_FRAME_RATE = 60;
let unitLength;
let currentPosition;
let previousPosition;
let displacementArray;
let displacementArrayLength;
let currentDirectionNumber;

function setup(){
  createCanvas(windowWidth, windowHeight);
  frameRate(IDEAL_FRAME_RATE);
  unitLength = Math.min(width, height) / 640;
  strokeWeight(Math.max(1, 1 * unitLength));
  stroke(128);
  fill(248, 10);
  displacementArray = [];
  for(let angle = 0; angle < TWO_PI; angle += PI / 2){
    displacementArray.push(p5.Vector.fromAngle(angle).mult(24 * unitLength));
  }
  // displacementArrayには8方向の情報が入ってる（はず）
  displacementArrayLength = displacementArray.length;
  initialize();
}

function draw(){
  if(frameCount % 4 === 0){
    rect(0, 0, width - 1, height - 1);
  }
  for(let i = 0; i < 60; i += 1){
    addDirection(Math.floor(random(-0.5 * displacementArrayLength + 1, 0.5 * displacementArrayLength)));
    currentPosition.add(displacementArray[currentDirectionNumber]);
    if(currentPosition.x < 0 || currentPosition.x >= 0 || currentPosition.y < 0 || currentPosition.y >= height){
      addDirection(Math.floor(0.5 * displacementArrayLength));
      currentPosition.x = constrain(currentPosition.x, 0, width);
      currentPosition.y = constrain(currentPosition.y, 0, height);
    }
    line(previousPosition.x, previousPosition.y, currentPosition.x, currentPosition.y);
    previousPosition.set(currentPosition);
  }
}
function initialize(){
  background(248);
  currentPosition = createVector(0.5 * width, 0.5 * height);
  previousPosition = createVector(0.5 * width, 0.5 * height);
  currentDirectionNumber = 0;
}
function addDirection(n){
  currentDirectionNumber += n;
  if(currentDirectionNumber >= displacementArrayLength){
    currentDirectionNumber -= displacementArrayLength;
  }
  if(currentDirectionNumber < 0){
    currentDirectionNumber += displacementArrayLength;
  }
}
function mousePressed(){
  initialize();
}
function keyPressed(){
  if(keyCode === 80){
    noLoop(); // 80: 'P'
  }
}
function keyReleased(){
  if(keyCode === 80){
    loop(); // 80: 'P'
  }
}
