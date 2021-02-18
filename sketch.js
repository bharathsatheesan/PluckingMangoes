
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;
var treeObj, stoneObj,groundObject, launcherObject;
var mango1;
var world,boy;
var score = 0;

function preload(){
	boy=loadImage("images/boy.png");
  }

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	mango1=new mango(1100,100,30);
	mango2=new mango(1200,200,30);
	mango3=new mango(1000,180,30);
	stoneObj = new Stone(220, 400, 50);
	treeObj=new tree(1050,600);
	groundObject=new ground(width/2,600,width,20);
	constraint = new Chain(stoneObj.body, {x:235, y:430});
	
	Engine.run(engine);

}

function draw() {

  fill("white")
  text("Score:" + score, width-300, 50);
  background(230);
  //Add code for displaying text here!
  image(boy ,200,360,200,300);

  
  detectCollision(stoneObj, mango1);
  detectCollision(stoneObj, mango2);
  detectCollision(stoneObj, mango3);
  

  treeObj.display();
  mango1.display();
  mango2.display();
  mango3.display();
  stoneObj.display();
  groundObject.display();
}

function mouseDragged(){
	Body.setPosition(stoneObj.body, {x:mouseX, y:mouseY});
}

function mouseReleased(){
	constraint.fly();
}

function keyPressed(){
    if(keyCode === 32){
		Body.setPosition(stoneObj.body, {x:235, y:430});
        constraint.attach(stoneObj.body);
    }
}

function detectCollision(stone, mango){
	mBodyP = mango.body.position;
	sBodyP = stone.body.position;

	var distance = dist(sBodyP.x, sBodyP.y, mBodyP.x, mBodyP.y);
	if(distance <= mango.r + stone.r){
		Matter.Body.setStatic(mango.body, false);
	}

	console.log(distance)
}