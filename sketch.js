var bg, backgroundImg,platformImage,platformGroup;
var diamondImage,diamondsGroup;
var spikeImage,spikesGroup;
var score =0;
var gameState ="PLAY";

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironImage = loadImage("images/iron.png");
  platformImage = loadImage("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
  spikeImage = loadImage("images/spikes.png");
  restartImage = loadImage("images/restart.png");
  }

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale =2;
 
  ground = createSprite(200,585,1700,10);
  ground.visible=false;
 
  ironMan = createSprite(200, 505, 20, 50);
  ironMan.addImage("running", ironImage);
  ironMan.scale = 0.3;
  ironMan.setCollider("rectangle",100,0,200,400)
  platformGroup = new Group();
  diamondsGroup = new Group();
  spikesGroup = new Group();

  restart = createSprite(500,300);
  restart.addImage(restartImage);
  restart.visible= false;
}

function draw() {



  ironMan.setCollider("rectangle",0,0,200,500);
    //mario.scale =0.3;
    bg.velocityY = 4;
    if (bg.y > 500){
      bg.y=bg.width/4;
    }
    
    if (keyDown("up")) {
    ironMan.velocityY = -10;
  }
  if (keyDown("left")) {
    ironMan.x = ironMan.x - 5;
  }
  if (keyDown("right")) {
    ironMan.x = ironMan.x + 5;
  }
  ironMan.velocityY = ironMan.velocityY + 0.5;

  generatePlatforms();
  for (var i = 0; i < platformGroup.length; i++) {
    var temp = platformGroup.get(i);

    if (temp.isTouching(ironMan)) {
      ironMan.collide(temp);
    }
  }

  ironMan.collide(ground);
    drawSprites();
  
}
function generatePlatforms() {
  if (frameCount % 60 === 0) {
    var brick = createSprite(1200, 10, 40, 10);
    brick.x = random(50, 850);
    brick.addImage(platformImage);
    brick.velocityY = 5;
    brick.lifetime = 250;
    platformGroup.add(brick);
  }
}

