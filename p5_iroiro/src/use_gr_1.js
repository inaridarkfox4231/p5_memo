'use strict';

let pg, pg_2; // createGraphics

function setup(){
  createCanvas(200, 200); // baseとなるcanvas
  pg = createGraphics(100, 100); // そこに重ねるやつ
  pg_2 = createGraphics(50, 50);
  drawGraphics();
}

function draw(){
  background(200); // baseCanvasの色（灰色200）
  image(pg, 50, 50); // 上層をbaseCanvasの上に貼り付ける（(50, 50)は右上の座標）
  //image(pg, 0, 0, 50, 50); // こうすると(0, 0)が右上の座標、そこから(50, 50)にサイズを縮小して表示される
  // これを使えばbaseにグラフを描いておいてその上を走る動点みたいなのも実現できる（はず）
  image(pg_2, 70, 70); // 順繰りに重ねられていく感じですね
  // これを使えば、たとえば場面(ゲーム状態とか)ごとにcanvasの差し替えなんてことも容易にできるようになります。
}

function drawGraphics(){
  //pg.background(100); // 上層の色（灰色100）// ここをなくせば、たとえば円の貼り付けとかも可能ですね
  pg.stroke('red');
  pg.fill('blue');
  pg.ellipse(pg.width / 2, pg.height / 2, 100, 100); // あ、ellipseの引数って直径・・半径だと思ってた（
  pg_2.background('yellow'); // 黄色一色の単純なGraphics
}
