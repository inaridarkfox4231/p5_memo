'use strict';
// あれ・・・
let mySlider;
//const BACKGROUND_COLOR = color(182, 186, 235);

function setup(){
  createCanvas(400, 400);
  mySlider = new customSlider(70, 70, 0, 255);
}

function draw(){
  background(182, 186, 235);
  mySlider.draw();
}

class customSlider{
  constructor(centerX = 0, centerY = 0, minV = 0, maxV = 100){
    this.value = 30; // 0~100
    this.center = createVector(centerX, centerY);
    this.sliderPos = centerX - 20;
    this.minValue = minV; // 最小値
    this.maxValue = maxV; // 最大値
    this.variable = false; // 動いてるかどうか
  }
  update(){
    this.value = constrain(this.value - 1, this.minValue, this.maxValue);
  }
  draw(){
    push();
    translate(this.center.x, this.center.y);
    fill(220);
    rect(-50, -3, 100, 6)
    noStroke();
    fill('blue');
    rect(-50 + this.sliderPos -5, -15, 10, 30);
    pop();
  }
  get value(){ return this.value; }
  get isVariable(){ return this.variable; }
}
