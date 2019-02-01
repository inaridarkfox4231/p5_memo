// SandyBackgroundのテスト
// FALworksさんのtrigonomatricfunction書いてみたい
// うねうね波がうねるやつ
// ・・・やめましょう・・
'use strict';
const IDEAL_FRAME_RATE = 60;
let currentBackground;
let black, gray;

function setup(){
  createCanvas(640, 640);
  textFont(loadFont("Georgia", 14, true));
  frameRate(IDEAL_FRAME_RATE);
  //colorMode(HSB, 360, 100, 100, 100);
  //background(0, 0, 100);
  currentBackground = new SandyBackground();
  black = color(0, 0, 15);
  gray = color(0, 0, 70);
  noLoop();
}

function draw(){
  //currentBackground.display();
  background(190, 190, 230);
}

class AbstractBackground{
  AbstractBackground(){}
  display(){}
}

class SandyBackground extends AbstractBackground{
  constructor(hueParameter = 0, saturationParameter = 0, minBrightness = 95, maxBrightness = 100, xSize = width, ySize = height){
    super();
    this.graphics = createGraphics(xSize, ySize);
    //this.graphics.beginDraw();
    this.graphics.loadPixels();
    for(let x = 0; x < xSize; x++){
      for(let y = 0; y < ySize; y++){
        this.graphics.pixels[x + y * ySize] = color(hueParameter, saturationParameter, random(minBrightness, maxBrightness));
        //this.graphics.pixels[x + y * ySize] = color(0, 0, 0);
        //console.log(this.graphics.pixels[x + y * ySize]);
      }
    }
    this.graphics.updatePixels();
    console.log(this.graphics);
    //this.graphics.endDraw();
  }
  display(){
    image(this.graphics, 0, 0);
  }
}
