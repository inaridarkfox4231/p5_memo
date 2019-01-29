// スライダー書いてみたい！！！！
'use strict';
let defaultSliderButton;
let pushedSliderButton;
let sliderRail;

let mySlider;
function setup(){
  createCanvas(400, 400);
  //mySlider = new customSlider(200, 200);
  defaultSliderButton = createGraphics(10, 30);
  pushedSliderButton = createGraphics(10, 30);
  sliderRail = createGraphics(100, 10);
  setSliderImage();
}

function draw(){
  background(220);
  image(defaultSliderButton, 100, 100);
  //background(mySlider.getValue()); // 0~255で灰色
  //mySlider.update();
  //mySlider.draw();
}

function setSliderImage(){ // 青いボタン、赤いボタン、レール
  defaultSliderButton.noStroke();
  defaultSliderButton.background(168, 228, 255)
  defaultSliderButton.fill(0, 156, 223);
  defaultSliderButton.rect(1, 1, 9, 29);
  defaultSliderButton.fill(57, 196, 255);
  defaultSliderButton.rect(1, 1, 8, 28);
}

// mySliderはスライダーです
// 長方形のレールの中心の座標を指定します。その長方形は横幅100がデフォルトです(変えることも可能)。
// その上を横幅10, 縦幅30のボタンが横移動します。
// 位置100に対してminとmaxを指定してmapで値を取得します。
// getValueはminとmaxと存在位置0~100から値を計算して返します。
// updateについて
// ボタンがクリックされるとスイッチが入ってマウスの横移動に応じてボタンの位置が横に移動します（constrain必須）。
// その状態でボタンが離されるとupdateが止まります。
// drawは各々の長方形を描画します（createGraphicsが使えそう）。
class customSlider{
  constructor(){};
}
