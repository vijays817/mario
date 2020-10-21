var bg ;
var Groundimage;
var mario, marioImage;
var obstacle, obstacleImage
var brickImage;
var obstacleGroup;
var brickGroup;
var mariocollided;
var GameState="play";
var score=0;
var restartImage;
var gameoverImage;

function preload (){
bg=loadImage("marioBG.jpg");
Groundimage=loadImage("ground2.png");
marioImage=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
obstacleImage=loadAnimation("obstacle1.png", "obstacle2.png","obstacle3.png", "obstacle4.png");
brickImage=loadImage("brick.png");
mariocollided=loadAnimation("collided.png");
restartImage=loadImage("restart.png");
gameoverImage=loadImage("gameOver.png");

jump=loadSound("jump.mp3");
die=loadSound("die.mp3");
}

function setup (){
createCanvas(600,350);
ground=createSprite(200,330,400,20);
ground.addImage(Groundimage);
ground.velocityX=-10;
ground.x=ground.width/2;

mario=createSprite(120,240,30,30);
mario.addAnimation("running",marioImage);
mario.addAnimation("collided",mariocollided);
mario.scale=2;
mario.setCollider("rectangle",0,0,20,20);

gameOver=createSprite(250,100,69,70);
gameOver.addImage("gameover",gameoverImage);
gameOver.visible=false;
gameOver.scale=0.5;

restart=createSprite(300,175,40,175);
restart.addImage("restart",restartImage);
restart.visible=false;

obstacleGroup=new Group();
brickGroup= new Group();



}

function draw (){

background(bg);
textSize(20)
fill("red");
text("score:"+score,480,30);


if (GameState==="play"){






if (ground.x<0){
    ground.x=ground.width/2;
}

if (keyDown("space")&& mario.y>=180){
    mario.velocityY=-15;
    jump.play();
}
mario.velocityY=mario.velocityY+1;


spawnObstacle();
spawnBrick();


for (var i=0; i<brickGroup.length;i++){
    if (brickGroup.get(i).isTouching(mario)){
     brickGroup.get(i).remove();
     score=score+1;
    }
}

if (obstacleGroup.isTouching(mario)){
    GameState="end";
    die.play();

}

}

else if (GameState==="end"){
ground.velocityX=0;
mario.velocityY=0;
obstacleGroup.setVelocityXEach(0);
brickGroup.setVelocityXEach(0);
mario.changeAnimation("collided" , mariocollided);
gameOver.visible=true;
restart.visible=true;

    
}
 
if (mousePressedOver(restart)){
    GameState="play";
    gameOver.visible=false;
    restart.visible=false;
    obstacleGroup.destroyEach();
    brickGroup.destroyEach();
    mario.changeAnimation("running",marioImage);
    score=0;
}



mario.collide(ground);
drawSprites();

}

function spawnObstacle(){
if (frameCount %100 === 0){
    var obstacle=createSprite (600,270, 40, 10);
    obstacle.velocityX=-5;
    obstacle.addAnimation("running" , obstacleImage);
    obstacleGroup.add(obstacle);
    

}






}

function spawnBrick(){
    if (frameCount %100===0){
    var brick=createSprite(random(500,600),random(100,200),30,30);
    brick.velocityX=-5;
    brick.addImage("brick",brickImage);
    brickGroup.add(brick);
    }
}





