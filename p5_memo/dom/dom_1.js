// ボタン！
'use strict';
var button;
function setup() {
  createCanvas(100, 100);
  background(0);
  button = createButton('click me');
  button.position(600, 19);
  button.mousePressed(changeBG);
}

function changeBG() {
  var val = random(255);
  background(val);
}
