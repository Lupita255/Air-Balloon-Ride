var balloon,bg;

function preload(){
   bg =loadImage("background.png");
   balloonImg=loadAnimation("balloon1.png","balloon2.png","balloon3.png");
  }

function setup() {
  createCanvas(500,500);
  database=firebase.database();

  balloon=createSprite(100,600,20,20);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale=0.4;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
}

function draw() {
  background(bg);
  fill("black");
  textSize(20);
  text("Use arrow keys to move Hot Air Balloon",100,200)

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x-10
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x+10
  }
  else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y-10
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y+10
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
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}

