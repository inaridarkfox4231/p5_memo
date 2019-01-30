'use strict';
let vSet = [];
let projection;

function setup(){
  createCanvas(400, 400);
  //translate(width / 2, height / 2);
  fill(0, 200, 0);
  noStroke();
  //noLoop();
  projection = new proj();
  regist(100, 70, 100);
  regist(-100, 100, 100);
  regist(100, -100, 100);
  regist(100, 50, -100);
  regist(100, -100, -100);
  regist(-100, 100, -100);
  regist(-100, -100, 100);
  regist(-100, -100, -100);
  angleMode(DEGREES) // 度数法。
}

function draw(){
  background(220);
  translate(width / 2, height / 2);
  showAllPoint();
}

// プロパティとして射影した時の座標を持たせてdrawではそれを描画する、
// projectionが更新されたらそのときのみ再計算するように書き換えないといけない
class dim3Vector{
  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
  }
  multVec(m){
    this.x *= m;
    this.y *= m;
    this.z *= m;
  }
  Coord(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
function innerProd(v1, v2){
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}
function addVec(v1, v2){
  return new dim3Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
}
function subVec(v1, v2){
  return new dim3Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
}
function multVec(v, m){
  return new dim3Vector(v.x * m, v.y * m, v.z * m);
}

class proj{
  constructor(){
    this.zAxis = new dim3Vector(1 / sqrt(3), 1 / sqrt(3), 1 / sqrt(3));
    this.xAxis = new dim3Vector(-1 / sqrt(2), 1 / sqrt(2), 0);
    this.yAxis = new dim3Vector(-1 / sqrt(6), -1 / sqrt(6), 2 / sqrt(6));
    this.xVec = new dim3Vector(-1 / sqrt(2), 1 / sqrt(2), 0); // 修正用
    this.yVec = new dim3Vector(-1 / sqrt(6), -1 / sqrt(6), 2 / sqrt(6)); // 修正用
    //console.log(this.xVec);
    this.angle = 0; // 角度
  }
  reset(){
    this.xAxis.Coord(this.xVec.x, this.xVec.y, this.xVec.z);
    this.yAxis.Coord(this.yVec.x, this.yVec.y, this.yVec.z);
    this.angle = 0;
  }
  addAngle(plus){ this.angle += plus; }
  rotate(){
    this.xAxis = subVec(multVec(this.xVec, cos(this.angle)), multVec(this.yVec, sin(this.angle)));
    this.yAxis = addVec(multVec(this.xVec, sin(this.angle)), multVec(this.yVec, cos(this.angle)));
  }
  calcProjVec(dim3Vec){
    return subVec(dim3Vec, multVec(this.zAxis, innerProd(dim3Vec, this.zAxis)));
  }
  calcX(projVec){ // 射影したベクトルに対して計算
    return innerProd(projVec, this.xAxis);
  }
  calcY(projVec){ // 射影したベクトルに対して計算
    return innerProd(projVec, this.yAxis);
  }
}

function regist(x, y, z){
  vSet.push(new dim3Vector(x, y, z));
}

function showAllPoint(){
  for(let i = 0; i < 8; i++){
    if(i >= 4){ fill(0, 0, 200); }
    drawProjPoint(vSet[i]);
  }
}

function keyTyped(e){
  if(key === 'r'){ projection.reset(); }
  else if(key === 'i'){ projection.addAngle(10); projection.rotate(); }
  else if(key === 'd'){ projection.addAngle(-10); projection.rotate(); }
  else if(keyCode === 13){
    console.log(projection.xAxis);
    console.log(projection.yAxis);
  }
}

function drawProjPoint(dim3Vec){
  let projVec = projection.calcProjVec(dim3Vec);
  //console.log(projection.calcX(projVec));
  //console.log(projection.calcY(projVec))
  ellipse(projection.calcX(projVec), projection.calcY(projVec), 10, 10);
}
