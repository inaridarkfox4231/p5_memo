// 1つのボールと6つのボール
'use strict';

let squareGroup;
let squareImages = [];
let i, j, k;

function preload(){
  for(i = 0; i < 7; i++){
    let squareImage = loadImage('./assets/squares/square' + i + '.png');
    squareImages.push(squareImage);
  }
}

function setup(){
  createCanvas(640, 640);
  squareGroup = new Group();
  createMasterSquare();
  for(i = 1; i <= 6; i++){
    createSubSquare(i);
  }
}

function draw(){
  background(220);
  drawSprites();
}

function createMasterSquare(){
  let square = createSprite(320, 160, 20, 20);
  square.addImage(squareImages[0]);
  square.addToGroup(squareGroup);
  square.rotation = 0;
  square.count = 0;
  square.update = function(){ // updateに書いたことは自動的に毎ターン呼び出される
    square.count += 1;
    square.rotation = (square.rotation + 1) % 360;
  }
}

function createSubSquare(colorId){
  let square = createSprite(320 + 120 * cos(colorId * PI / 3), 160 + 60 * sin(colorId * PI / 3), 20, 20);
  square.addImage(squareImages[colorId]);
  square.addToGroup(squareGroup);
  square.rotation = 0;
  square.count = 0;
  square.update = function(){
    square.count += 1;
    square.rotation = (square.rotation + 1) % 360;
    square.position.x = 320 + 120 * cos(colorId * PI / 3 + square.count * PI / 180);
    square.position.y = 160 + 60 * sin(colorId * PI / 3 + square.count * PI / 180);
  }
}
