var astronaut, astronaut_running, astronaut_collided;
var ground, invisibleGround, groundImage;


var obstacleImg;

var gameState, PLAY, END;

var restart, gameOver, gameOverimg, restartimg;

var score;
var backGround;


function preload(){
  astronaut_running = loadImage("images/cartoonastronaut.png");
  astronaut_collided = loadImage("images/deadastronaut.png");
  obstacleImg = loadImage("images/cartoonasteroid.png");
  backgroundImg = loadImage("images/spacebackground.png");
  
  
  
  



  
  
}

function setup() {
  createCanvas(900, 700);
  
  PLAY=1;
  END=0;
  gameState=PLAY;
  backGround = createSprite(500,450);
  background.scale = 0.1
  astronaut = createSprite(250,530,20,50);
  console.log(astronaut.y);
  astronaut.addImage("running", astronaut_running);
  astronaut.addImage("collided", astronaut_collided);
  astronaut.scale = 0.1;
  
  
  ground = createSprite(300,530,400,20);
  ground.visible = false;
 
  
  
  
  
  obstaclesGroup = new Group();
  
  score = 0;

}
function draw() {

 
  backGround.addImage(backgroundImg);
  
  text("Score: "+ score, 500,50);
  
  astronaut.collide(ground);
  
  if(gameState===PLAY){
  score = score + Math.round(getFrameRate()/60); 
  
  backGround.velocityX =+8;
  //if(backGround.x ===0){
  //backGround.x = backGround.width/2;
  //}  
  ground.velocityX=-6;
  camera.position.x = camera.position.x + 8;
  astronaut.x = camera.position.x;
 
  ground.x = camera.position.x;
    console.log(camera.position.x);
    
    if(keyDown("space")&&astronaut.y  <520) {
    astronaut.velocityY = -10;
  }
  
  astronaut.velocityY = astronaut.velocityY + 0.5; 
    
  
  spawnObstacles();  
    
  if(obstaclesGroup.isTouching(astronaut)){
    
   gameState=END;
    
  }
    
  }
 else if(gameState===END) {
 textSize(30);
 fill("white");
 text("gameOver")
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    astronaut.velocityY = 0;
    backGround.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    //change the trex animation
    astronaut.changeAnimation("collided", astronaut_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
  
    
    //restart.depth=obstaclesGroup.depth;
       
  }
  
  

  drawSprites();
}


function reset(){
  gameState = PLAY;
  

  
  obstaclesGroup.destroyEach();
  
  astronaut.changeAnimation("running", astronaut_running);
  
  score = 0;
  
}







function spawnObstacles() {
  if(camera.position.x === camera.position.x +90) {
    var obstacle = createSprite(600,505,5,40);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImg);
    //generate random obstacles
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



