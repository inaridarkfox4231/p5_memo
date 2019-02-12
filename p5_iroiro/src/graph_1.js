// グラフを描こう！
// MassGameに出てくるeaseInOutQuintについて調べよう
'use strict';
let gr;

function setup(){
  createCanvas(420, 420);
  gr = createGraphics(400, 400);
  drawGraph(1, 1, easeInOutQuint);
  //drawGraph(1, 1, routeX);
}

function draw(){
  background(220);
  image(gr, 10, 10)
}

// f(x) = 16x^5(x < 1/2), = 1 - 16(1-x)^5 (x >= 1/2).
// 若干変更した。まず、xSizeとySizeは描画したいサイズ。
// どちらも0以上で、MAXとして指定する。つまり[0, xSize]×[0, ySize]という。
// その範囲で、func()の引数は・・あーそうか、[0, ySize]に入ってないといけないのか。
function drawGraph(xSize, ySize, func){
  gr.background(220);
  gr.noFill();
  let points = [];
  for(let i = 0; i < 100; i++){
    let t = (i * xSize)/ 200;
    let point = createVector(t * 400 / xSize, func(t) * 400 / ySize);
    points.push(point)
  }
  for(let i = 100; i <= 200; i++){
    let t = (i * xSize) / 200;
    let point = createVector(t * 400 / xSize, func(t) * 400 / ySize);
    points.push(point);
  }
  gr.strokeWeight(1.0);
  gr.beginShape();
  points.forEach(function(point){
    gr.curveVertex(point.x, point.y);
  })
  gr.endShape();
}

function easeInOutQuint(x){
  if(x < 0.5){ return 16 * pow(x, 5); }
  return 1 - 16 * pow(1 - x, 5);
}

function routeX(x){
  return pow(x, 0.5);
}
