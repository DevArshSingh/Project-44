var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sceship_plapayer, spaceshipdamaged;
var spaceship


var asteriodimg;

var space
var spaceimg

var gameOver, restart;
var gameoverImg, restartImg;

var score=0;
var asteriods_destroyed=0;
var lives=0;


function preload(){
    spaceship = loadImage("spaceship2.png");
    /*spaceshipdestroyed = loadImage ("");*/

    asteriodimg = loadImage("asteriod.png");

    spaceimg = loadImage("background.jpg");

    gameoverImg = loadImage("gameOver.png");

    restartImg = loadImage("restart.png");

}


function setup() {
    createCanvas(displayWidth-20, displayHeight-20);
    
    spaceship_player = createSprite(100,displayHeight/2,20,50);
    spaceship_player.addImage("spaceship", spaceship);
    spaceship_player.scale = 0.3;

    
    space = createSprite(0,0,displayWidth-20,displayHeight-20);
    space.addImage("spaceimg",spaceimg);
    space.x = space.width /2;
    space.velocityX = -(6 + 3*score/100);
    space.scale=3
    
    gameOver = createSprite(300,100);
    gameOver.addImage("over",gameoverImg);
    
    restart = createSprite(300,140);
    restart.addImage("res",restartImg);
    
    gameOver.scale = 0.5;
    restart.scale = 0.5;
  
    gameOver.visible = false;
    restart.visible = false;
    
    asteriodGroup = new Group();
    
    score = 0;
  }
  
  function draw() {
    //spaceship_player.debug = true;
    background(255);
    text("Score: "+ score, 500,50);
    
    if (gameState===PLAY){
      score = score + Math.round(getFrameRate()/60);
      space.velocityX = -(6 + 3*score/100);
    
      if(keyDown("space")) {
       
      }
    
     
    
      if (space.x < 0){
        space.x = space.width/2;
      }
    
      
      spawnasteriods();
    
     /* if(asteriodGroup.isTouching(spaceship_player)){
          gameState = END;
      }*/   
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      
      //set velcity of each game object to 0
      space.velocityX = 0;
      spaceship_player.velocityY = 0;
      asteriodGroup.setVelocityXEach(0);
      
      
      //change the spaceship_player animation
      //spaceship_player.changeAnimation("collided",spaceship_player_collided);
      
      //set lifetime of the game objects so that they are never destroyed
     asteriodGroup.setLifetimeEach(-1);
      
      
      if(mousePressedOver(restart)) {
        reset();
      }
    }
    
    
    drawSprites();
  }
  
  function spawnasteriods() {
    if(frameCount % 60 === 0) {
      var asteriod = createSprite(600,165,10,40);
      //obstacle.debug = true;
      asteriod.velocityX = -(6 + 3*score/100);
      
      //generate random obstacles
      asteriod.addImage("asteriods",asteriodimg)
      
      //assign scale and lifetime to the obstacle           
      asteriod.scale = 0.5;
      asteriod.lifetime = 300;
      //add each obstacle to the group
      asteriodGroup.add(asteriod);
    }
  }
  
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    asteriodGroup.destroyEach();
    
    //spaceship_player.changeAnimation("running",spaceship_player_running);
    
   
    
    score = 0;
    
  }