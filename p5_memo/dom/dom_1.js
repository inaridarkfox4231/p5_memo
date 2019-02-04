// ボタン！
'use strict';
var button;
var button_hover;

function setup() {
  createCanvas(400, 400);
  background(0);
  button = createButton('click me');
  button.position(600, 19);

  button.mousePressed(changeBG);
  button.style('width', '100px');
  button.style('height', '50px');
  button.style('font-size', '20px');
  button.style('border-radius', '10px');
  button.style('background-color', 'blue');
  button.mouseOver(hover); // hoverしたときのcss処理
  button.mouseOut(unhover); // hoverを外したときのcss処理
  // こだわりすぎると混乱しそうなのでほどほどに・・・
  // とりあえずクリックで
}

function changeBG() {
  var val = random(255);
  background(val);
}

function hover(){
  if(button_hover){ return; }
  button.style('background-color', 'red');
  button_hover = true;
}
function unhover(){
  if(!button_hover){ return; }
  button.style('background-color', 'blue');
  button_hover = false;
}
