'use strict';
// コンストラクタのデフォルト定義の実験
let ball;
let colorball;

function setup(){
  createCanvas(200, 200);
  ball = new circleFigure();
  colorball = new circleFigure(80, 80, color('red'));
  noLoop();
  noStroke();
}

function draw(){
  background(220);
  ball.display();
  colorball.display();
}

class figure{
  constructor(){}
}

class circleFigure extends figure{
  constructor(x = 30, y = 30, c = color('black')){
    super(); // 空っぽでもこれは必要
    this.x = x;
    this.y = y;
    this.color = c;
  } // 多重定義は出来ないけどdefaultを設定しておくことは出来る
  display(){
    fill(this.color);
    ellipse(this.x, this.y, 50, 50);
  }
}
