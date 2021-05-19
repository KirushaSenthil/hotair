var cityImage, balloonSprite, balloonImage
var database;
var position;
var height;

function preload(){
cityImage=loadImage("cityImage.png")
balloonImage=loadAnimation("HotAirBallon-01.png","HotAirBallon-02.png","HotAirBallon-03.png")
}
function setup() {
  createCanvas(500,500);
  balloonSprite=createSprite(400, 200, 50, 50);
  balloonSprite.addAnimation("balloon",balloonImage)
  balloonSprite.scale=0.5
  database=firebase.database();
    console.log(database)
    var listener=database.ref('balloonSprite/position')
    listener.on("value",readPosition,showError)
}

function draw() {
  background(cityImage); 
  textSize(10)
  text("use arrow keys to move hot air balloon",50,100)
  
  if(keyDown(LEFT_ARROW)){
   updateHeight(-10,0)
  } 
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0)
  }
  
  if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloonSprite.addAnimation("balloon",balloonImage);
    balloonSprite.scale=balloonSprite.scale-0.01;
  }
  if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloonSprite.addAnimation("balloon",balloonImage)
    balloonSprite.scale=balloonSprite.scale+0.01
  }
  drawSprites();
}


function showError(){
  console.log("error")
}



function updateHeight(x,y){
  database.ref('balloonSprite/position').set({
    'x': height.x+x,
    'y': height.y+y
  })
}

function readPosition(data){
  height=data.val();
  balloonSprite.x = height.x;
  balloonSprite.y = height.y;
}