var balloon,balloonImg;
var database;
var height;

function preload(){
   bg =loadImage("background.png");
   balloonImg=loadAnimation("balloon1.png","balloon2.png","balloon3.png");
  }

function setup() {
  createCanvas(500,500);
  database = firebase.database();

  balloon=createSprite(250,650);
  balloon.addAnimation("hotAirBalloon",balloonImg);

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
}

function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImg);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImg);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImg);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImg);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  
}


function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}

