'use strict';

let currentBodySystem;
let frameCountPerCommand = 90; // 各コマンドの所要時間

let currentBackground;

function setup(){
  createCanvas(640, 640);
  colorMode(HSB, 360, 100, 100, 100);
  currentBackground = new AlphaSolidBackground();
  noLoop();
}

function draw(){
  currentBackground.display();
}

class abstractBackground{
  constructor(){}
  display(){}
}

class AlphaSolidBackground extends abstractBackground{
  constructor(){ super(); }
  display(){
    push();
    fill(40, 100, 100, 70);
    noStroke();
    rect(0, 0, width, height);
    pop();
  }
}
