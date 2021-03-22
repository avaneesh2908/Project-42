var player, player_running;
var back, backImage;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var survivalTime;
var gameState, play=1, end=0;
var invisible;
var lives=2;
var monkeyCollided;

function preload() {
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyCollided=loadAnimation("Monkey_01.png");
}

function setup() {
  createCanvas(600,400);
  
  back = createSprite(0, 0, 600, 400);
  back.addImage("image", backImage);
  back.velocityX = -4;
  back.scale = 1.5;
  //console.log(ground.x);
  
  invisible = createSprite(300,350,600,10);
  invisible.visible = false;
  
  player = createSprite(80, 315, 20, 20);
  player.addAnimation("moving", player_running);
  player.addAnimation("collided", monkeyCollided);
  player.scale = 0.1;
  //player.debug = true;

  bananaGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
  survivalTime = 0;
  
  gameState = play;
}

function draw() {
  drawSprites();
  
  if (gameState == play) {
    back.velocityX = -4;
    
    if (back.x < 0) {
      back.x = back.width / 2;
    }

    if (keyDown("space") && player.y >= 220) {
      player.velocityY = -10;
    }

    player.velocityY = player.velocityY + 0.5;

    food();
    enemy();

    if (player.isTouching(bananaGroup)) {
      score = score+1;
      bananaGroup.destroyEach();
    }

    if (obstacleGroup.isTouching(player)) {
      lives = lives-1;
      obstacleGroup.destroyEach();
    }
    
    if (lives==0) {
      gameState = end;
    }
    
    switch(score) {
        case 10:player.scale=0.125;
          break;
        case 20:player.scale=0.150;
          break;
        case 30:player.scale=0.175;
          break;
        case 40:player.scale=0.200;
          break;
        case 50:player.scale=0.225;
          break;
        case 60:player.scale=0.250;
          break;
        case 70:player.scale=0.275;
          break;
        case 80:player.scale=0.300;
          break;
        case 90:player.scale=0.325;
          break;
        case 100:player.scale=0.350;
          break;
    }
      
    survivalTime = survivalTime+Math.ceil(getFrameRate()/60);
  }

  else if (gameState == end) {
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    back.velocityX=0;
    player.velocityY=0;
    player.changeAnimation("collided", monkeyCollided);
    fill("white");
    textSize(30);
    text("Game Over",200,200);
    fill("white");
    textSize(24);
    text("Press 'R' to restart",180, 250);
  }
  
  if(keyDown("r")) {
    gameState = play;
    player.changeAnimation("moving", player_running);
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    lives=2;
    survivalTime = 0;
  }
  
  player.collide(invisible);

  stroke("red");
  textSize(20);
  fill("red");
  text("Score : " + score, 300, 50);

  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time : " + survivalTime, 50, 50);
  
  stroke("yellow");
  textSize(20);
  fill("yellow");
  text("Lives : " + lives, 450, 50);
}

function food() {
  if (frameCount % 80 == 0) {
    rand = Math.round(random(120, 200));
    banana = createSprite(400, rand, 10, 10);
    banana.addImage("image", bananaImage);
    banana.velocityX = -4;
    banana.lifetime = 100;
    banana.scale = 0.1;
    bananaGroup.add(banana);
  }
}

function enemy() {
  if (frameCount % 300 == 0) {
    obstacle = createSprite(400, 320, 10, 10);
    obstacle.addImage("image", obstacleImage);
    obstacle.velocityX = -5;
    obstacle.lifetime = 80;
    obstacle.scale = 0.1;
    //obstacle.debug = true;
    obstacleGroup.add(obstacle);
  }
}