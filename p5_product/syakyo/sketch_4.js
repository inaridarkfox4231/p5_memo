// FAL worksさんのMassGameの写経みたいなこと
'use strict';
const SIZE = 7;
const ARRAY_LIST_INITIAL_CAPACITY = 49;
const IDEAL_FRAME_RATE = 60;
const LEFT_ROUTE_ANGLE = -Math.PI / 6; // なんかね、PIだと通らないの。
const RIGHT_ROUTE_ANGLE = Math.PI / 6;

//let debugFlag = true;

let currentBodySystem;
let frameCountPerCommand = 90; // 各コマンドの所要時間

let currentBackground;

function setup(){
  createCanvas(640, 640);
  frameRate(IDEAL_FRAME_RATE);
  colorMode(HSB, 360, 100, 100, 100);
  currentBackground = new AlphaSolidBackground();
  currentBodySystem = new MassGameBodySystem();
  for(let i = 0; i < ARRAY_LIST_INITIAL_CAPACITY; i++){
    currentBodySystem.registerNewBody(new MassGameBody(width * 0.5 + 20 * cos(TWO_PI * i  / ARRAY_LIST_INITIAL_CAPACITY), height * 0.5 + 20 * sin(TWO_PI * i / ARRAY_LIST_INITIAL_CAPACITY)));
  }
}

function draw(){
  currentBackground.display();

  currentBodySystem.update();
  currentBodySystem.display();

  if(frameCount % frameCountPerCommand === 0){
    currentBodySystem.command(frameCountPerCommand);
  }
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

// Utility.

function randomSignedInt(){
  if(random(1) < 0.5){ return 1; }
  return -1;
}

function createSandyBackground(xSize, ySize, mibBrightness, maxBrightness){
  graphics = createGraphics(xSize, ySize);
  graphics.beginDraw();
  graphics.loadPixels();
  for(let x = 0; x < xSize; x++){
    for(let y = 0; y < ySize; y++){
      graphics.pixels[x + y * xSize] = color(0, 0, random(minBrightness, maxBrightness));
    }
  }
  graphics.updatePixels();
  graphics.endDraw();

  return graphics;
}

function easeInOutQuint(x){ // 5乗イージング（あとでグラフ描いてみる）
  if(x < 0.5){
    return 0.5 * pow(2 * x, 5);
  }else{
    return 0.5 * pow(2 * (x - 1), 5) + 1;
  }
}

function randomSignedFloat(v){
  if(ramdom(1) < 0.5){ return -v; }else{ return v; }
}

function getShuffleBodyList(originalList){
  let temporalList = [];
  let shuffledList = [];
  originalList.forEach(function(currentBody){
    temporalList.push(currentBody);
  })
  for(let i = 0; i < originalList.length; i++){
    let bodyIndex = Math.floor(random(temporalList.length));
    shuffledList.push(temporalList[bodyIndex]);
    temporalList.splice(bodyIndex, 1);
  }
  return shuffledList;
}

class simpleBody{
  constructor(initX = 0, initY = 0){
    this.position = createVector(initX, initY);
    this.properFrameCount = 0;
  }
  update(){
    this.properFrameCount++;
  }
  display(){
    push();
    translate(this.position.x, this.position.y);
    fill(0, 0, 40);
    noStroke();
    ellipse(0, 0, 10, 10);
    pop();
  }
}

class MassGameBody extends simpleBody{
  constructor(initX = 0, initY = 0){
    super(initX, initY);
    this.previousTargetPosition = this.position;
    this.currentCommand = new Command(this.position, 1, true);
  }
  update(){
    this.position = this.currentCommand.calculatePosition(this.previousTargetPosition);
    this.currentCommand.update();
    super.update();
  }
  setCommand(com){
    this.currentCommand = com;
    this.previousTargetPosition = this.position;
  }
}

class Command{
  constructor(nextPos = createVector(0, 0), f = 0, straight = true){
    this.nextTargetPosition = nextPos;
    this.routeAngle;
    this.givenFrameCount = f;
    //console.log("construct given = %d", this.givenFrameCount);
    this.properFrameCount = 0; // 0で初期化しなかったせいでエラーになってた
    if(straight === true){
      this.routeAngle = 0;
    }else if(random(1) < 0.5){
      this.routeAngle = LEFT_ROUTE_ANGLE;
    }else{
      this.routeAngle = RIGHT_ROUTE_ANGLE;
    }
  }
  update(){
    this.properFrameCount++;
  }
  calculatePosition(previousTargetPosition){
    if(this.properFrameCount > this.givenFrameCount){
      return this.nextTargetPosition;
    }
    let progress = easeInOutQuint(this.properFrameCount / this.givenFrameCount);
    let commandedMove = p5.Vector.sub(this.nextTargetPosition, previousTargetPosition);
    commandedMove.rotate(this.routeAngle * sin(progress * PI));
    return p5.Vector.add(previousTargetPosition, p5.Vector.mult(commandedMove, progress));
  }
}

class MassGameBodySystem{
  constructor(){
    this.liveBodyList = [];
    this.commandTypeList = [];
    this.commandTypeList.push(new RandomCommandType());
    this.commandTypeList.push(new SquareCommandType(Math.floor(224 / (SIZE - 1))));
    this.commandTypeList.push(new RandomCommandType());
    this.commandTypeList.push(new CircleCommandType());
    this.commandTypeList.push(new RandomCommandType());
    this.commandTypeList.push(new RotatedSquareCommandType(Math.floor(224 / (SIZE - 1))));
    this.commandTypeList.push(new RandomCommandType());
    this.commandTypeList.push(new SquareCommandType(Math.floor(448 / (SIZE - 1))));
    this.commandTypeList.push(new RandomCommandType());
    this.commandTypeList.push(new SpiralCommandType());
    //this.commandTypeList.push(new RandomCommandType());
    //this.commandTypeList.push(new TriangleCommandType());
    //this.commandTypeList.push(new RandomCommandType());
    //this.commandTypeList.push(new HexagonalCommandType());
  }
  update(){
    this.liveBodyList.forEach(function(currentBody){
      currentBody.update();
    })
  }
  display(){
    this.liveBodyList.forEach(function(currentBody){
      currentBody.display();
    })
  }
  registerNewBody(b){
    this.liveBodyList.push(b);
  }
  command(givenFrameCount){
    this.commandTypeList[0].command(getShuffleBodyList(this.liveBodyList), givenFrameCount);
    // like a circuler queue.
    this.commandTypeList.push(this.commandTypeList[0]);
    this.commandTypeList.shift();
  }
}

class abstractCommandType{
  constructor(){}
  command(bodyList, givenFrameCount){}
}

class RandomCommandType extends abstractCommandType{
  constructor(){ super(); }
  command(bodyList, givenFrameCount){
    bodyList.forEach(function(currentBody){
      let angle = random(TWO_PI);
      let targetPosition = createVector(width * 0.5 + random(width * 0.4) * cos(angle), height * 0.5 + random(height *0.4) * sin(angle));
      currentBody.setCommand(new Command(targetPosition, givenFrameCount, true));
    })
  }
}

class SquareCommandType extends abstractCommandType{
  constructor(itv = 32){
    super();
    this.interval = itv;
  }
  command(bodyList, givenFrameCount){
    for(let i = 0; i < SIZE; i++){
      for(let k = 0; k < SIZE; k++){
        if(i * SIZE + k >= bodyList.length){ break; }
        let x = width * 0.5 + this.interval * (-((SIZE - 1) / 2) + k);
        let y = height * 0.5 + this.interval * (-((SIZE - 1) / 2) + i);
        bodyList[i * SIZE + k].setCommand(new Command(createVector(x, y), givenFrameCount, false));
      }
    }
  }
}

class CircleCommandType extends abstractCommandType{
  constructor(){ super(); }
  command(bodyList, givenFrameCount){
    let radius = 200;
    for(let i = 0; i < bodyList.length; i++){
      let angle = i * TWO_PI / bodyList.length;
      let targetPosition = createVector(0.5 * width + radius * cos(angle), 0.5 * height + radius * sin(angle));
      bodyList[i].setCommand(new Command(targetPosition, givenFrameCount, false));
    }
  }
}

class RotatedSquareCommandType extends abstractCommandType{
  constructor(itv = 32){
    super();
    this.interval = itv;
  }
  command(bodyList, givenFrameCount){
    //let interval = 32;
    for(let i = 0; i < SIZE; i++){
      for(let k = 0; k < SIZE; k++){
        if(i * SIZE + k >= bodyList.length){ break; }
        let x = this.interval * (-((SIZE - 1) / 2) + k);
        let y = this.interval * (-((SIZE - 1) / 2) + i);
        let v = createVector(x, y);
        v.rotate(QUARTER_PI);
        v.add(width * 0.5, height * 0.5);
        bodyList[i * SIZE + k].setCommand(new Command(v, givenFrameCount, false));
      }
    }
  }
}

class SpiralCommandType extends abstractCommandType{
  constructor(){ super(); }
  command(bodyList, givenFrameCount){
    let radius = 200;
    for(let i = 0; i < bodyList.length; i++){
      let angle = 4 * i * TWO_PI / bodyList.length;
      let targetPosition = createVector(width * 0.5 + radius * (i / bodyList.length) * cos(angle), height * 0.5 + radius * (i / bodyList.length) * sin(angle));
      bodyList[i].setCommand(new Command(targetPosition, givenFrameCount, false));
    }
  }
}

// 6×6のとき限定です（1+2+3+...+8 = 6x6)
class TriangleCommandType extends abstractCommandType{
  constructor(){ super(); }
  command(bodyList, givenFrameCount){
    let arrow_1 = createVector(-34, 34 * sqrt(3));
    let arrow_2 = createVector(68, 0);
    let topOfTriangle = createVector(320, 100);
    for(let i = 0; i < 8; i++){
      for(let k = 0; k <= i; k++){
        let targetPosition = p5.Vector.add(p5.Vector.mult(arrow_1, i), p5.Vector.mult(arrow_2, k));
        targetPosition.add(topOfTriangle);
        bodyList[Math.floor(i * (i + 1) / 2 + k)].setCommand(new Command(targetPosition, givenFrameCount, false));
      }
    }
  }
}

// 13x13のとき限定です（1+6+12+...+42 = 13x13)
class HexagonalCommandType extends abstractCommandType{
  constructor(){ super(); }
  command(bodyList, givenFrameCount){
    bodyList[0].setCommand(new Command(createVector(width / 2, height / 2), givenFrameCount, false));
    for(let i = 1; i <= 7; i++){
      let directionVector = createVector(-16, 16 * sqrt(3)); // これを足しつつ、ループの最後に回転。
      let centerVector = createVector(width / 2, height / 2);
      for(let k = 0; k < 6; k++){
        let startPosition = createVector(32 * i * cos(k * PI / 3), 32 * i * sin(k * PI / 3))
        let directionVector = createVector(32 * cos((k + 2) * PI / 3), 32 * sin((k + 2) * PI / 3));
        for(let m = 1; m <= i; m++){
          let targetPosition = p5.Vector.add(startPosition, p5.Vector.mult(directionVector, m));
          targetPosition.add(centerVector);
          bodyList[3 * i * i - 3 * i + 1 + i * k + m - 1].setCommand(new Command(targetPosition, givenFrameCount, false));
        }
        directionVector.rotate(3 / PI); // 60°回転
      }
    }
  }
}
