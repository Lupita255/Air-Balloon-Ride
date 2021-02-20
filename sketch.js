var balloon;
var bg,movement;

function preload(){
  bg = loadImage("background.png");
  movement=loadAnimation("balloon1.png","balloon2.png","balloon3.png");
}

function setup() {
  createCanvas(800,500);
  balloon.addAnimation(movement);
  var balloonPosition= database.ref('balloon/position');
  balloonPosition.on("value", readPosition,showError)
}

function draw() {
  background(bg); 
  textSize(20);
  stroke("black");
  text("Use arrow keys to move the balloon",10,30); 

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x -10
}
else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x +10
}
else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y -10
}
else if(keyDown(DOWN_ARROW)){
  balloon.y = balloon.y +10
}
  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/position').set({
    'x':balloon.x+x,
    'y':balloon.y+y
  })
}

function readHeight(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}

function showError(){
  console.log("Error in writing to the database");
}

