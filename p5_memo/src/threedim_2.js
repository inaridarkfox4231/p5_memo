'use strict';
// なんか3次元みたいにして点を配置
let proj;
let dim3Vecs = [];
let projVecs = [];
let startPos = [0, 1, 2, 3, 0, 1, 2, 3, 4, 5, 6, 7]; // 辺を引くための準備
let endPos = [1, 3, 0, 2, 4, 5, 6, 7, 5, 7, 4, 6];

function setup(){
  createCanvas(400, 400);
  angleMode(DEGREES);
  noStroke();
  fill(0, 0, 40);
  regist(100, 100, 100);
  regist(-100, 100, 100);
  regist(100, -100, 100);
  regist(-100, -100, 100);
  regist(100, 100, -100);
  regist(-100, 100, -100);
  regist(100, -100, -100);
  regist(-100, -100, -100);
  regist(100, 0, 0);
  regist(0, 100, 0);
  regist(0, 0, 100);
  regist(100, 100, 0);
  regist(100, 0, 100);
  regist(0, 100, 100);
  regist(100, -100, 0);
  regist(-100, 100, 0);
  regist(-100, -100, 0);
  regist(100, 0, -100);
  regist(-100, 0, 100);
  regist(-100, 0, -100);
  regist(0, 100, -100);
  regist(0, -100, 100);
  regist(0, -100, -100);
  proj = new projection(-4, -3, -5); // 立体感がないからよくわかんないね。遠くの点を薄くするとかしないと無理
  dim3Vecs.forEach(function(v){
    projVecs.push(createVector(0, 0)); // dummy
  })
  calcProjVecs();
  //noLoop();
}
function draw(){
  background(220);
  drawProjVecs();
  drawAllSpan();
}

// dim3Vector.
// 3つの引数を持つ3次元のベクトル
// 内積などを定義する
// 射影した時の座標を持たせる

class dim3Vector{
  constructor(ordX, ordY, ordZ){
    this.x = ordX;
    this.y = ordY;
    this.z = ordZ;
  }
  setOrd(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
  }
  norm(){
    return sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
}

function multVec(v, m){
  return new dim3Vector(v.x * m, v.y * m, v.z * m);
}

function divVec(v, d){
  return new dim3Vector(v.x / d, v.y / d, v.z / d);
}

function addVec(v1, v2){
  return new dim3Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
}

function subVec(v1, v2){
  return new dim3Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
}

function innerProd(v1, v2){
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

function copyVec(v){
  return new dim3Vector(v.x, v.y, v.z);
}

function outerProd(v1, v2){
  return new dim3Vector(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
}

function regist(x, y, z){
  dim3Vecs.push(new dim3Vector(x, y, z));
}

function calcProjVecs(){
  for(let i = 0; i < dim3Vecs.length; i++){
    projVecs[i] = proj.getProj(dim3Vecs[i]);
  }
}

function drawProjVecs(){
  push();
  translate(width / 2, height / 2);
  noStroke();
  for(let i = 0; i < projVecs.length; i++){
    if(i === 8){
      fill(255, 0, 0);
    }else if(i === 9){
      fill(0, 255, 0);
    }else if(i === 10){
      fill(0, 0, 255);
    }else{
      fill(0);
    }
    ellipse(projVecs[i].x, projVecs[i].y, 10, 10);
  }
  //projVecs.forEach(function(pv){
  //  ellipse(pv.x, pv.y, 10, 10);
  //})
  pop();
}

function drawSpan(v1, v2){
  push();
  translate(width / 2, height / 2);
  stroke(0, 0, 0);
  line(v1.x, v1.y, v2.x, v2.y);
  //console.log(v1);
  //console.log(v2);
  pop();
}

function drawAllSpan(){
  for(let i = 0; i < startPos.length; i++){
    drawSpan(projVecs[startPos[i]], projVecs[endPos[i]]);
  }
}

// projection.
// 0でないベクトルを与えて初期化する。
// そのベクトルの矢印方向からみた射影を行う。

class projection{
  constructor(x, y, z){
    let v = new dim3Vector(x, y, z);
    this.zAxis = divVec(v, v.norm());
    let xPreAxis;
    let yPreAxis;
    if(this.zAxis.y !== 0){
      xPreAxis = new dim3Vector(-this.zAxis.y, this.zAxis.x, 0);
      yPreAxis = outerProd(this.zAxis, xPreAxis); // 外積
    }else{
      xPreAxis = new dim3Vector(this.zAxis.z, 0, -this.zAxis.x);
      yPreAxis = outerProd(this.zAxis, xPreAxis); // 外積
    }
    this.xAxis = divVec(xPreAxis, xPreAxis.norm());
    this.yAxis = divVec(yPreAxis, yPreAxis.norm());
    this.xVec = copyVec(this.xAxis);
    this.yVec = copyVec(this.yAxis);
    this.angle = 0; // x, y のAxisの回転
    console.log(this.xAxis);
    console.log(this.yAxis);
    console.log(this.zAxis);
  }
  reset(){
    this.xAxis = copyVec(this.xVec);
    this.yAxis = copyVec(this.yVec);
    this.angle = 0;
  }
  increaseAngle(){ this.angle += 5; }
  decreaseAngle(){ this.angle -= 5; }
  rotate(){
    this.xAxis = subVec(multVec(this.xVec, cos(this.angle)), multVec(this.yVec, sin(this.angle)));
    this.yAxis = addVec(multVec(this.xVec, sin(this.angle)), multVec(this.yVec, cos(this.angle)));
  }
  getProj(v){ // 射影
    let projVec = subVec(v, multVec(this.zAxis, innerProd(v, this.zAxis)));
    return new createVector(innerProd(projVec, this.xAxis), innerProd(projVec, this.yAxis));
  }
}

function keyTyped(){
  if(key === 'r'){ proj.reset(); calcProjVecs(); }
  else if(key === 'i'){ proj.increaseAngle(); proj.rotate(); calcProjVecs(); }
  else if(key === 'd'){ proj.decreaseAngle(); proj.rotate(); calcProjVecs(); }
}

// 点の配列とか入力できるようにしたい
// 線引くやつも簡単にできるようにしたい
// あと、できれば面に色つけたり・・・あと軸変更とかできるように！
